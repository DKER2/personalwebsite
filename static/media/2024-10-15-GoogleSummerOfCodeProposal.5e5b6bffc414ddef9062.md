"Improve the Database Cache Backend" proposal for
Google Summer of Code 2024.

Table of content
================

1. [**Abstract**](#1-abstract)
    1.1 [Drawbacks of the existing cache backend](#11-drawbacks-of-the-existing-cache-backend)
    1.2 [Goals](#12-goals)
    1.3 [Benefits](#13-benefits)
2. [**Proposal**](#2-proposal) 
    2.1 [Overview](#21-overview) 
    2.2 [Phase 1](#22-phase-1)
    2.3 [Phase 2](#23-phase-2)
3. [**Schedule and milestones**](#3-schedule-and-milestones)
    3.1 [Implement ORM](#31-phase-1-7-weeks)
    3.2 [Add culling option](#32-phase-2--4-weeks)
4. [**About me**](#4-about-me)

# 1. Abstract

## 1.1 Drawbacks of the existing cache backend

Django currently has a cache backend, it support the wide range of caching including:

* Database caching with help of RDBMS
* File-based caching 
* Local memory caching using RAM
* Memcache caching using help of external library supporting distributed memory caching
* Redis caching using redis library to manage caching.

Although supporting different backends, there are a lot of space to improve it. First of all, for `DatabaseCache`, SQL statement is generic, which can be inefficient or even redundant for certain SQL dialects. Secondly, there's a absence of customization options for culling strategies in local memory cache, file-based cache, and also database caching. Offering users with the ability to select a culling option that best suits their application's usage could greatly enhance efficiency and performance.

## 1.2 Goals

This proposal focuses on developing database cache backends that is compatible into the [four database backends](https://github.com/django/django/tree/8dbfef469582128c9d8487bf3f45d861b2ecfcb9/django/db/backends) currently supported by us: MySQL, Oracle, PostgreSQL, and SQLite3. First of all, I plan to write a load test base on this [benchmark](https://github.com/adamchainz/django-mysql-benchmark-cache) for caching to measure the time for caching. The success of this proposal will depend on the time cutting on this load test. The second phase of proposal is intended to extend culling option for caching technique.  

This proposal is not only about improving `DatabaseCache` speed. The second
part of the proposal is about offering users more control and flexibility in managing their cache.

## 1.3 Benefits

There are a lot of benefits. Improve speed of caching by adapting to SQL dialects. Adding a load test specifically designed for caching can offer insights into the system's performance, aiding developers in understanding and optimizing their system. In the second phase, we extend flexibility of use to choose culling option. This enhancement underscores Django's capability to adapt to various requirements, impling its standing as a flexible framework.

# 2. Proposal

## 2.1 Overview

The proposal is divided into two phases. In the first place, I plan to incorporate basic queries from [django-mysql](https://github.com/adamchainz/django-mysql/tree/main) into the main repository. Follow the same partern in django-mysql, I will write the SQL for each caching functions using ORM technique to write SQL to reduce the code duplication. In the second phase, I want to extend the ability of Django to control different culling technique ranging from Random Replacement (RR), Least Recently Used (LRU), Least Frequently Used (LFU) and Probabilty Culling.

## 2.2 Phase 1

### USE BLOB INSTEAD OF TEXT TO STORE VALUE

For creating cache table in database, we can save a lot of memory with using of supported datatype in different database as do in django-mysql:

```
CREATE TABLE `{table_name}` (
    ...
    value longblob NOT NULL,
    ...
)
```

Instead of using text datatype to store compressed pickled as in django core:

```
fields = (
    ...
    models.TextField(name="value"),
    ...
)
```

### ADAPTING TO MULTIPLE DATABASES USING ORM
For caching mechanisms, I plan to develop an implementation concrete class of the interface specified in the [BaseCache](https://github.com/django/django/blob/main/django/core/cache/backends/base.py) class, utilizing various ORM to enhance efficiency and reduce execution time. 

##### ORM IMPROVEMENT
The initial focus is on enhancing Django's Object-Relational Mapping (ORM) system. Certain ORM functions are currently under-optimized. For example, `update_or_create` function of Django ORM check for a record's existence, locking the row upon finding it, and then proceeding with the update. 

```python
with transaction.atomic(using=self.db):
    # Lock the row so that a concurrent update is blocked until
    # update_or_create() has performed its save.
    obj, created = self.select_for_update().get_or_create(defaults, **kwargs)
    if created:
        return obj, created
    for k, v in resolve_callables(defaults):
        setattr(obj, k, v)
    ...
    obj.save()
```
With the introduction of native upsert capabilities in numerous database systems, it's now possible to perform updates and inserts through a single SQL statement, that is race-conditions free. By using upserts statement, Django can reduce the number of queries required to achieve a desired state in the database, thus minimizing latency and improving throughput.

Database backends in Django already incorporate an upsert function, as demonstrated in [here](https://github.com/django/django/blob/main/django/db/backends/mysql/operations.py#L430-L458), but for Oracle we do not have a native SQL query. My plan is to develop an upsert function for Oracle using the `MERGE` statement. This will then be integrated into the `update_or_create` function to provide consistent functionality across database backends.

##### IMPLEMENT CACHING FUNCTION IN ORM

At the stage, I plan to adapt [django-mysql](https://github.com/adamchainz/django-mysql) query to Django core using ORM. Below is some examples of adapting functions from [django-mysql](https://github.com/adamchainz/django-mysql) for caching mechanisms, utilizing Django's ORM.

Improving `get_many()`:
```python 
def get_many(self, keys, version=None):
    db = router.db_for_read(self.cache_model_class)
    rows = self.cache_model_class.objects.using(db).filter(cache_key__in=keys).values_list('cache_key', 'value', 'expires')
    
    result = {}
    expired_keys = []

    now = timezone.now()
    for key, value, expires in rows:
        if expires < now:
            expired_keys.append(key)
        else:
            result[key_map.get(key)] = pickle.loads(base64.b64decode(value.encode()))

    self._base_delete_many(expired_keys)

    return result
```
Improving `_cull()`:
```python 
def _cull(self, db, cursor, num):
        if self._cull_frequency == 0:
            self.clear()
        else:
            expired_instances = self.cache_model_class.objects.filter(expires__lt=timezone.now())
            expired_instances.delete()
            
            delete_count = expired_instances.count()
            remaining_num = num - deleted_count
            if remaining_num > self._max_entries:
                cull_num = remaining_num // self._cull_frequency
                last_cache_key = CacheModel.objects.all().order_by('cache_key').values_list('cache_key', flat=True)[cull_num:cull_num+1].first()
                if last_cache_key:
                    self.cache_model_class.objects.filter(cache_key__lt=last_cache_key).delete()
```

### Compression with zlib

As pointed out in [@adamchainz's post](https://adamj.eu/tech/2015/05/17/building-a-better-databasecache-for-django-on-mysql/), with the use of zlib, we can save time for compressing processing. 

```python
def encode(self, obj: Any) -> tuple[int | bytes, _EncodedKeyType]:
    """
    Take a Python object and return it as a tuple (value, value_type), a
    blob and a one-char code for what type it is
    """
    if self._is_valid_mysql_bigint(obj):
        return obj, "i"

    value = pickle.dumps(obj, pickle.HIGHEST_PROTOCOL)
    value_type: _EncodedKeyType = "p"
    if self._compress_min_length and len(value) >= self._compress_min_length:
        value = zlib.compress(value, self._compress_level)
        value_type = "z"
    return value, value_type
```


## 2.3 Phase 2

In second phase, the effort will be focused on extending the culling option for django cache. Why this is need? Depend on specific use case, the data access will be different, for example LFU (Least Frequently Use) ensures that popular content, which is accessed frequently by different users, stays in cache. But LRU (Least Recently Use) may be outstanding in a web application, when pages that have been recently viewed are more likely to be accessed again in the near term. 

At this stage, I plan to bring multiple culling option to cache of Django ranging from Random Replacement (RR), Least Recently Used (LRU), Least Frequently Used (LFU). 

An example of Least Frequently Used, instead of discarding entries based on their insertion order (cache_key), we prioritize deletion by cache_use_count, which tracks how many times an entry has been accessed.

```python
def _cull_lfu(self, db, cursor, now, num):
    if self._cull_frequency == 0:
        self.clear()
    else:
        expired_instances = self.cache_model_class.objects.filter(expires__lt=timezone.now())
        expired_instances.delete()
        
        delete_count = expired_instances.count()
        remaining_num = num - deleted_count
        if remaining_num > self._max_entries:
            cull_num = remaining_num // self._cull_frequency
            last_cache_key = CacheModel.objects.all().order_by('cache_use_count').values_list('cache_key', flat=True)[cull_num:cull_num+1].first()
            if last_cache_key:
                self.cache_model_class.objects.filter(cache_key__lt=last_cache_key).delete()
```

# 3. Schedule and milestones
Before starting coding I would like to do some preparation:

- Discussing and confirming with django-mysql authors to merge library to Django core.

- A list of new tests for the caching, particularly the load test for caching performance.

For the first week, I will closing up my internship at my current company Traveloka. So that I probally can not contribute 8 hours a day at this time, but I will soliditify my idea at this period by coding a POC at this time. After 1st of June, I will available to contribute all my effort to developing proposal. 

### 3.1 Phase 1 (7 weeks)

(From 1st June until 19th July).

I will start with writing load test for metric the caching performance of different caching technique. After the performance evaluation is done, I will start writing code from improving ORM. From then on, we will adapt DatabaseCache to different SQL dialect by implementing ORM code for it. 

##### 3.1.1 Rewriting load tests for caching (1 week)

* Write load test

I plan to use the framework provided by this [this repo](https://github.com/adamchainz/django-mysql-benchmark-cache) as a foundation, making modifications to conduct benchmarks on the current version of Django. This involves several tasks, including updating the repository's dependencies to the latest versions and adding configurations for various databases to enable comprehensive testing.

##### 3.1.2 ORM improvement (1 week with a buffer of 1 week)

* Enhancing certain ORM functions
 
A week to delve into enhancing certain ORM functions, among which the update_or_create function in Django's ORM has been identified as particularly resource-intensive, as detailed in the [ORM IMPROVEMENT](#orm-improvement) discussion. This exploration will focus on identifying and implementing potential efficiencies. A buffer of week is reserved if there are multiple places to improve.

This will invovled change in this [function]( https://github.com/django/django/blob/main/django/db/models/query.py#L969-L1012)

And also implement [this function](https://github.com/django/django/blob/main/django/db/backends/base/operations.py#L799-L800) with use of `MERGE` for Oracle database

##### 3.1.3 Change datatype for value column (1 week)

* Create a `Model` for Cache table using BLOB datatype

This process would involve relocating the code responsible for creating database tables from the management layer directly into the cache layer. It would also necessitate adopting custom data types specific to each database to optimize performance and compatibility.

As demonstrated in this code:

```
class BaseDatabaseCache(BaseCache):
    def __init__(self, table, params):
        super().__init__(params)
        self._table = table
        self.cache_model_class = get_cache_model()
        
    def get_cache_model():
        class CacheModel(models.Model):
            cache_key = models.CharField(name="cache_key", max_length=255, unique=True, primary_key=True)
            value = models.TextField(name="value")
            expires = models.DateTimeField(name="expires", db_index=True)
        return CacheModel

```


##### 3.1.4 Implement caching function in ORM (2 week)

* Develop a concrete subclass that inherits from a parent [`BaseCache`](https://github.com/django/django/blob/main/django/core/cache/backends/base.py#L57) class
* Change and adding aditional unit tests

##### 3.1.5 Testing (0.5 week)

* Run load test to report the performance improvement over old `DatabaseCache`

##### 3.1.6 Writing Document (0.5 week)

* Write document for upgraded Database cache

### 3.2 Phase 2  (4 weeks)
(From 20th Jul to 19th Aug)
##### 3.2.1 Implement culling option (2 week)
* Add `culling_option` parameter to cull function.
* Implement logic for each culling_option

This will involved modifying cull function for all four cache backend Django support including [locmem](https://github.com/django/django/blob/main/django/core/cache/backends/locmem.py), [file-based](https://github.com/django/django/blob/main/django/core/cache/backends/filebased.py), [database](https://github.com/django/django/blob/main/django/core/cache/backends/db.py)

##### 3.2.2 Adding unit test for different culling option (1 week)
* Write unit test for each culling option
* Run load test to report performance of each culling option

The test will locate under this [folder](https://github.com/django/django/tree/main/tests/cache)

##### 3.2.3 Document (1 week)
* Write documentation for the culling option, explaining the preferred use cases for various scenarios.
# 4. About me

My name is Dang Huy Phuong and I am a student of Nanyang Technological University (Singapore). My time zone is UTC+08:00. I have programmed in Python for at least 3 years. I also programmed in C++ and Java. I've completed three internships in the technology sector. All regarding building system for 100+ users. You can find my resume [here](https://drive.google.com/file/d/1aAg82CEidD2FS4W6jco4zBMJN8mVbAxf/view?usp=sharing).

I've been eager to contribute to an open-source project for a long time, yet hadn't found one that felt like the right fit for me. When I came across Django as part of the Google Summer of Code (GSOC), it immediately caught my interest. I am now very keen to contribute to it and join the open-source community.

My English proficiency is at a professional level.

My e-mail is `pdanghuy03@gmail.com`. My Linkedin profile is [here](https://www.linkedin.com/in/dang-huy-phuong-3424bb220/). I have join discord channel my handle is @DKER, feel free to reach out to me if you got any questions. 
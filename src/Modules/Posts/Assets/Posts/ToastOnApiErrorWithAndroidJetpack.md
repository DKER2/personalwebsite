# Toast On API Error With Android JetPack

## Introduction
I started learning Android development with Jetpack Compose and Kotlin just a few weeks ago. For my first project, I'm building a stock analysis platform that uses Notion as the database backend.

Jetpack Compose has been excellent so far. It allows me to define the UI entirely in Kotlin code, moving away from XML. The declarative state management principles feel similar to what I've encountered in frameworks like ReactJS and Flutter, which helps keep the UI state clean and predictable.

I've run into a common but critical problem: API error communication. When my API requests fail—due to issues like throttling or an internal server error—I need a clear, non-intrusive way to notify the user.

A Toast or a Snackbar to display these kinds of network errors to the user

## Difficulties

I've been relying on both online searches and ChatGPT for Jetpack Compose implementation examples. However, I've noticed a significant gap: there is very little proper documentation available, and ChatGPT frequently provides overly generic or incorrect answers for this specific problem

ViewModel:
```kotlin
data class ApiState<out T>(
    val isLoading: Boolean = false,
    val data: T? = null,
    val error: String? = null
)

class MyViewModel : ViewModel() {

    private val _apiState = MutableStateFlow(ApiState<MyData>())
    val apiState: StateFlow<ApiState<MyData>> = _apiState

    fun fetchData() {
        viewModelScope.launch {
            _apiState.value = _apiState.value.copy(isLoading = true, error = null)
            try {
                val result = apiService.getSomeData() // Your API call
                _apiState.value = _apiState.value.copy(data = result, isLoading = false)
            } catch (e: Exception) {
                // Handle various exceptions (IOException for network, HttpException for 4xx/5xx)
                val errorMessage = when (e) {
                    is IOException -> "Network error. Check your connection."
                    is HttpException -> "Server error: ${e.code()}"
                    else -> "An unexpected error occurred."
                }
                _apiState.value = _apiState.value.copy(error = errorMessage, isLoading = false)
            }
        }
    }

    // Crucial: A function to clear the error after it has been shown
    fun clearError() {
        _apiState.value = _apiState.value.copy(error = null)
    }
}
```

Screen:
```kotlin
@Composable
fun MyScreen(viewModel: MyViewModel = viewModel()) {
    // 1. Create and remember the SnackbarHostState
    val snackbarHostState = remember { SnackbarHostState() }
    val apiState by viewModel.apiState.collectAsState()
    val context = LocalContext.current

    // 2. Use LaunchedEffect to react to the error state change
    LaunchedEffect(apiState.error) {
        apiState.error?.let { errorMessage ->
            // Show the Snackbar
            snackbarHostState.showSnackbar(
                message = errorMessage,
                actionLabel = "Dismiss" // Optional action button
                // duration = SnackbarDuration.Short // Default is Short
            )
            // 3. IMPORTANT: Clear the error state in the ViewModel
            viewModel.clearError()
        }
    }

    Scaffold(
        // 4. Attach the snackbarHostState to the SnackbarHost
        snackbarHost = {
            SnackbarHost(hostState = snackbarHostState)
        }
    ) { paddingValues ->
        // Your main screen content
        Column(modifier = Modifier.padding(paddingValues)) {
            Button(onClick = { viewModel.fetchData() }, enabled = !apiState.isLoading) {
                Text("Fetch Data")
            }
            if (apiState.isLoading) {
                CircularProgressIndicator()
            }
            apiState.data?.let {
                Text("Data loaded successfully!")
            }
        }
    }
}
```

This implementation at first looks good, but lets take a step back. This implementation to catch error is implemented in
ViewModel layer, this meant that for every api call you need to wrap within try and catch. And for all Screen function we
will need to include a `LaunchedEffect`, this approach have a lot of code duplication. So what is the walk around

## Walk Around Approach

### Service layer modification

Instead of capturing error in every ViewModel, I decide to move capturing to one level higher, in service layer.
In service layer, every error will be published to a single EventBus in the application, in this case `SnackBarManager`

```kotlin
package com.example.stockanalyseplatform.data.source
import android.util.Log
import com.example.stockanalyseplatform.BuildConfig
import com.example.stockanalyseplatform.utils.SnackBarManager
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody
import okhttp3.RequestBody.Companion.toRequestBody

open class BaseService (
    private val snackBarManager: SnackBarManager,
    private val endpoint: String,
    private val authToken: String
) {
    private val _client = OkHttpClient()

    private suspend fun request(path: String, method: String, body: RequestBody): String? = withContext(Dispatchers.IO) {
        val request = Request.Builder()
            .url("$endpoint$path")
            .method(method, body)
            .addHeader("Authorization", "Bearer $authToken")
            .addHeader("Notion-Version", BuildConfig.LAST_NOTION_API_VERSION)
            .build()
        _client.newCall(request).execute().use { response ->
            if (!response.isSuccessful) {
                snackBarManager.showError(response.body.toString())
                Log.e("Request Failed", "Request Failed")
                null
            } else {
                response.body?.string()
            }
        }
    }

    suspend fun get(path: String): String? = withContext(Dispatchers.IO) {
        request(path, "GET", "".toRequestBody(null))
    }

    suspend fun post(path: String, body: String = ""): String? = withContext(Dispatchers.IO) {
        request(path, "POST", body.toRequestBody(null))
    }
}
```

```kotlin
package com.example.stockanalyseplatform.utils

import android.util.Log
import androidx.lifecycle.ViewModel
import dagger.hilt.android.scopes.ViewModelScoped
import jakarta.inject.Inject
import javax.inject.Singleton
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.SharedFlow

@Singleton
class SnackBarManager @Inject constructor() {
    private val _errorFlow = MutableSharedFlow<String>(replay = 1)
    val error: SharedFlow<String> = _errorFlow

    suspend fun showError(message: String) {
        _errorFlow.emit(message)
    }
}
```

This EventBus will be pass to a ViewModel

```kotlin
package com.example.stockanalyseplatform.presentation.layout.view_model

import androidx.lifecycle.ViewModel
import com.example.stockanalyseplatform.utils.SnackBarManager
import dagger.hilt.android.lifecycle.HiltViewModel
import jakarta.inject.Inject

@HiltViewModel
class SnackBarViewModel @Inject constructor(snackBarManager: SnackBarManager) : ViewModel() {
    val error = snackBarManager.error
}
```

This ViewModel will be latter used to display in a parent Compose. Now to apply snackbar on all api error, you just need 
to wrap your application by SnackBarWrapper, and then publish api error to eventbus.

```kotlin
package com.example.stockanalyseplatform.presentation.layout

import android.util.Log
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.Role.Companion.Button
import androidx.hilt.navigation.compose.hiltViewModel
import com.example.stockanalyseplatform.presentation.layout.view_model.SnackBarViewModel
import kotlinx.coroutines.launch

@Composable
fun SnackBarWrapper(
    snackBarViewModel: SnackBarViewModel = hiltViewModel(),
    childComposable: @Composable (modifier: Modifier) -> Unit
) {
    val snackBarHostState = remember { SnackbarHostState() }

    LaunchedEffect(Unit) {
        snackBarViewModel.error.collect { msg ->
            snackBarHostState.showSnackbar("Error: $msg")
        }
    }

    Scaffold(
        snackbarHost = { SnackbarHost(snackBarHostState) }
    ) { innerPadding ->
        childComposable(
           Modifier.padding(innerPadding)
        )
    }
}
```

### Reflection

This approach offers significant advantages by centralizing the management of API errors. By defining how API errors are handled and displayed once within the base class and a dedicated Wrapper Screen, we achieve a cleaner and more efficient codebase.

Key Benefits:

- Simplified Component Logic: Child components and composables are no longer burdened with handling or displaying API exceptions.

- Enhanced Focus on Business Logic: Developers can dedicate 100% of their effort to implementing core business logic, without the distraction of managing error state and presentation across multiple components.

- Consistency and Maintainability: This pattern ensures a consistent user experience for error reporting across the entire application and simplifies future updates to the error display, as changes only need to be made in a single, central location.

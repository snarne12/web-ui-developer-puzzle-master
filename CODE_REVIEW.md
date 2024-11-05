# Code Issues / Code Smells

**_ Repeated Snackbar Logic: _**
The snackbar logic for displaying 'Undo' messages is repeated in both BookSearchComponent and ReadingListComponent.
This could lead to code duplication and make future updates cumbersome.
Solution: Extract the snackbar functionality into a shared service, SnackbarService,
that could manage snackbars centrally.

**_ Type Annotations in removeFromReadingList: _**
The item parameter in removeFromReadingList method in ReadingListComponent lacks a type annotation.
This can make the code harder to understand and prone to type-related bugs.
Solution: Define a type for item, likely ReadingListItem.

**_ Unused Import (clearSearch): _**
The clearSearch action is imported but only conditionally used, which may indicate that the search logic could be refactored for clarity.
Solution: Consider making the search logic more declarative and ensure that all imported actions are consistently used.

**_ Component Communication: _**
The BookSearchComponent and ReadingListComponent handle independent parts of the reading
list and search features but might need clearer separation of concerns or a well-defined
service to mediate their interactions.
Solution: Use a centralized service to handle the reading list state management, ensuring both components communicate effectively without direct dependency on each other.

**_ Inconsistent Naming Conventions: _**
Some methods, like addBookToReadingList, use a descriptive naming style, while others, like removeFromReadingList, do not specify that they act on books. Consistency here would improve readability.
Solution: Use naming conventions consistently across components for clarity.

**_ Formatting Dates in BookSearchComponent: _**
The formatDate method in BookSearchComponent doesn’t handle invalid date strings or empty values effectively.
Solution: Consider improving the function to handle invalid dates gracefully or by adding a default fallback date format.

# Improvements for Code Quality and User Experience

**_ Optimized State Selection: _**
In ngOnInit, BookSearchComponent subscribes to getAllBooks directly. This could lead to unnecessary re-renders if the entire state changes frequently.
Solution: Optimize with async pipes in templates or use distinctUntilChanged for the subscription to reduce
unwanted updates.

**_ Search Function Optimization: _**
The search feature could be enhanced by adding a debounce to avoid multiple rapid dispatches of searchBooks.
Solution: Use debounceTime in the searchForm value changes, ensuring fewer but more meaningful search actions.

**_ Centralized Form Validation: _**
The search term form control could benefit from adding validation at the form level to provide feedback (e.g., minimum character requirement).
Solution: Add a validator to the searchForm to guide the user and improve search performance.

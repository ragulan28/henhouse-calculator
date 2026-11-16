# LocalStorage Input Persistence

## 1. Purpose
To enhance the user experience by automatically saving all calculator input values in the browser's `localStorage`. When poultry farmers, butchers, and distributors refresh the page or reopen the app, their customized input values (live purchase price, profit margin, operating expenses, live weight, and dressing yield) remain intact instead of reverting to default presets.

## 2. Architecture
The persistence logic is implemented directly in [js/app.js](file:///home/ragulan/work/henhouse/henhouse-calculator/js/app.js) and operates completely on the client side without any external server or network dependency:

- **Storage Key**: `henhouse_inputs`
- **Data Format**: Serialized JSON dictionary mapping input element IDs (`purchase`, `margin`, `expenses`, `weight`, `yield`) to their string values.
- **Error Handling**: Wrapped in `try...catch` blocks to gracefully degrade in private browsing mode, disabled storage environments, or when storage quotas are exceeded.

## 3. Data Flow
1. **App Initialization**:
   - `loadSavedInputs()` is executed before the initial calculation and language initialization.
   - It reads `localStorage.getItem("henhouse_inputs")`, parses the JSON object, and populates the matching input field values.
   - If no valid saved inputs exist or `localStorage` is inaccessible, the pre-existing default values (`defaults[id]`) remain in the DOM.
2. **User Input (`input` event)**:
   - On every keystroke/change in any of the 5 input fields, `saveInputs()` reads all current field values and serializes them to `localStorage`.
   - `calculate()` is then triggered to re-render all prices and breakdowns immediately.
3. **Reset (`click` event on `#reset`)**:
   - Restores the DOM input values back to the factory defaults (`defaults[id]`).
   - Removes `henhouse_inputs` from `localStorage` using `localStorage.removeItem("henhouse_inputs")`.
   - Triggers `calculate()` to recalculate outputs based on defaults.

## 4. API Changes
None. No external or public APIs were modified.

## 5. Database Changes
None. Fully client-side using Web Storage API (`localStorage`).

## 6. New Components
- Helper function `loadSavedInputs()` in `js/app.js`.
- Helper function `saveInputs()` in `js/app.js`.
- Storage key constant `INPUTS_STORAGE_KEY = "henhouse_inputs"`.

## 7. Configuration
Default fallback values (defined in `js/app.js`):
- `purchase`: 800 (LKR / kg)
- `margin`: 15 (%)
- `expenses`: 50 (LKR / bird)
- `weight`: 2 (kg)
- `yield`: 71 (%)

## 8. Feature Flags & Permissions
No permissions required. Standard browser Web Storage API.

## 9. Limitations
- Values are scoped to the specific browser domain/origin. Opening the application in a different browser, incognito window, or different device will not share the saved values.
- If the user clears site data / cookies in browser settings, the saved values will revert to defaults.

## 10. Future Improvements
- Optional export/import of custom pricing profiles (e.g. "Broiler Farm A", "Village Chicken B") as downloadable JSON configurations.

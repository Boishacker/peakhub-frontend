# Preventing Blank Screens When Adding New Pages

This guide provides solutions for common issues that cause blank screens in React Router applications, especially when adding new pages.

## Common Issues and Solutions

### 1. Missing Route Definition

**Problem:** Adding a new page component but forgetting to add a route for it in `App.tsx`.

**Solution:**
- Always add new routes in `App.tsx` when creating new page components
- Example:
```jsx
<Route path="/your-new-page" element={<YourNewPage />} />
```

### 2. Navigation Issues

**Problem:** Using regular HTML `<a>` tags instead of React Router's components.

**Solution:**
- Always use `<Link>` from react-router-dom for internal navigation
- Never use `<a href="/some-path">` for internal links
- For programmatic navigation, use the `navigate` function from `useNavigate()`

**Example:**
```jsx
import { Link, useNavigate } from 'react-router-dom';

// Using Link component
<Link to="/profile">Your Profile</Link>

// Programmatic navigation
const navigate = useNavigate();
<button onClick={() => navigate('/profile')}>Go to Profile</button>
```

### 3. Hot Module Reload Issues

**Problem:** Vite's development server sometimes fails to properly reload when adding new pages or components.

**Solutions:**
1. **Restart the development server:**
   ```
   # Stop the current server with Ctrl+C, then restart
   npm run dev
   ```

2. **Hard refresh the browser:**
   - Windows/Linux: `Ctrl+Shift+R`
   - Mac: `Cmd+Shift+R`

3. **Clear browser cache:**
   - Chrome: `Ctrl+Shift+Del` (Windows/Linux) or `Cmd+Shift+Del` (Mac)
   - Firefox: `Ctrl+Shift+Del` (Windows/Linux) or `Cmd+Shift+Del` (Mac)

### 4. React Component Errors

**Problem:** Errors in React components can cause the entire application to show a blank screen.

**Solutions:**
1. **Check the browser console for errors:**
   - Open DevTools (F12 or Right-click > Inspect)
   - Go to Console tab to see error messages

2. **Use React Error Boundaries:**
   - We've added an ErrorBoundary component that catches errors
   - Wrap your routes or components with it to prevent entire app crashes
   - Error boundaries catch errors during rendering, in lifecycle methods, and in constructors

## Debugging Checklist

When you encounter a blank screen:

1. ✅ Check browser console for errors
2. ✅ Verify the route is properly defined in App.tsx
3. ✅ Ensure you're using proper React Router navigation
4. ✅ Try a hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
5. ✅ Restart the development server
6. ✅ Check if the component is exported properly (export default YourComponent)
7. ✅ Verify import paths are correct

## Prevention Best Practices

1. **Add routes immediately:** When creating a new page component, immediately add its route to App.tsx
2. **Use TypeScript:** TypeScript helps catch errors before runtime
3. **Consistent naming:** Keep file/component/route naming consistent
4. **Test navigation:** After adding a new page, test navigation to it from multiple entry points
5. **Wrap with ErrorBoundary:** Wrap sections of your app with error boundaries to isolate failures 
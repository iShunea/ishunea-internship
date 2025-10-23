# Google Tag Manager (GTM) Tracking Implementation

## Overview
This document describes the implementation of Google Tag Manager (GTM) tracking for all contact forms on the iShunea Tech Solutions website.

## GTM Container ID
**GTM-NT6WCJL**

## Installation
GTM has been integrated in `index.html`:

1. **Script in `<head>`**: Loads GTM as early as possible for optimal tracking
2. **Noscript in `<body>`**: Fallback for users with JavaScript disabled

## Form Tracking Implementation

### Tracked Forms
All three contact forms on the website track successful submissions:

1. **ShowCall** - Contact/Request a Call form
2. **ShowJob** - Job Application/Careers form  
3. **ShowAlert** - Error Reporting form

### GTM Event Structure
When a form is successfully submitted (after validation), the following event is pushed to `dataLayer`:

```javascript
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: "form_submit",
  form_name: "contact_form" | "job_application" | "error_report",
  form_type: "request_call" | "careers" | "alert",
  form_data: {
    // Additional contextual data
  }
});
```

### Form-Specific Events

#### 1. ShowCall (Contact Form)
```javascript
{
  event: "form_submit",
  form_name: "contact_form",
  form_type: "request_call",
  form_data: {
    country_code: "+373",  // Selected country code
    has_message: true      // Whether optional message was filled
  }
}
```

#### 2. ShowJob (Job Application Form)
```javascript
{
  event: "form_submit",
  form_name: "job_application",
  form_type: "careers",
  form_data: {
    country_code: "+373",  // Selected country code
    has_message: true      // Whether optional message was filled
  }
}
```

#### 3. ShowAlert (Error Report Form)
```javascript
{
  event: "form_submit",
  form_name: "error_report",
  form_type: "alert",
  form_data: {
    error_type: "compatibility-error",  // Selected error type
    has_message: true                    // Whether optional message was filled
  }
}
```

## Form Validation
All forms include comprehensive validation before tracking:

- **Full Name**: Minimum 2 characters
- **Email**: Valid email format (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- **Phone** (ShowCall, ShowJob): Valid phone number (6-15 digits)
- **Error Type** (ShowAlert): Required selection
- **Terms & Conditions**: Must be accepted

Only validated, successful form submissions trigger GTM events.

## User Experience Features

### Loading States
- Button text changes to "sending..." during submission
- Button is disabled during submission
- Prevents duplicate submissions

### Error Handling
- Real-time validation with error messages
- Clear error text below each invalid field
- Red border highlighting for invalid inputs
- Error messages disappear when user corrects input

### Success Flow
1. Form validation passes
2. Loading state activates ("sending...")
3. GTM event is pushed to dataLayer
4. Form data is cleared
5. Success modal is displayed
6. Form modal closes

### CSS Styling
Error styling is defined in `src/styles/ShowModalBox.css`:

```css
.error-text {
  color: #e74c3c;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  display: block;
  margin-top: 8px;
}

.input-error {
  border-color: #e74c3c !important;
}
```

## Technical Implementation

### Component Structure
Each form component (`ShowCall`, `ShowJob`, `ShowAlert`) includes:

1. **State Management**
   - `formData`: Stores all form field values
   - `errors`: Tracks validation errors
   - `isSubmitting`: Controls loading state
   - `selectedCountry` (ShowCall, ShowJob): Tracks selected country code

2. **Validation Function**
   - `validateForm()`: Returns true if all fields are valid
   - Sets error messages for invalid fields

3. **Submit Handler**
   - `handleSubmit(e)`: Async function that:
     - Prevents default form submission
     - Validates all fields
     - Simulates backend submission (1 second delay)
     - Pushes GTM event to dataLayer
     - Resets form and shows success modal

### Phone Country Select
The `PhoneCountrySelect` component has been enhanced to:
- Accept `onCountryChange` callback prop
- Notify parent component when country selection changes
- Default to first country in list (Afghanistan +93)

## Testing GTM Events

### Development Testing
1. Open browser DevTools → Console
2. Submit a form with valid data
3. Check console for GTM push: `dataLayer.push({...})`

### GTM Debug Mode
1. Install Google Tag Assistant Chrome Extension
2. Enable Preview mode in GTM
3. Submit forms and verify events in debug panel

### Production Testing
1. Check GTM container for "form_submit" triggers
2. Configure tags to fire on "form_submit" event
3. Use GTM Preview mode to test before publishing

## Files Modified

### Core Implementation
- `src/components/ShowModalBox.jsx` - Added state management, validation, and GTM tracking
- `src/styles/ShowModalBox.css` - Added error styling

### Documentation
- `index.html` - GTM script installation
- `replit.md` - Updated with GTM information
- `docs/GTM_TRACKING_IMPLEMENTATION.md` - This file

## Future Enhancements
Potential improvements for GTM tracking:

1. **Enhanced Event Data**
   - Track form completion time
   - Track field-specific interactions
   - Track validation error types

2. **Additional Events**
   - Form start/abandonment tracking
   - File attachment tracking
   - Country selection tracking

3. **Error Tracking**
   - Track validation errors
   - Track submission failures
   - Track API errors (when backend is connected)

## Maintenance Notes
- GTM Container ID is hardcoded in `index.html`
- All forms use `window.dataLayer` global object
- Events are only fired after successful validation
- No PII (Personally Identifiable Information) is sent to GTM

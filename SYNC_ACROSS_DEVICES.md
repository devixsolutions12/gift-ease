# Syncing Payment Settings Across Devices

## Current Implementation

GiftEase uses localStorage for storing payment settings, which means settings are stored locally on each device. This approach has limitations when it comes to syncing data across multiple devices.

## New Export/Import Feature

To address the cross-device sync issue, we've added export/import functionality to the admin panel:

### How to Transfer Settings Between Devices

1. **Export Settings (Source Device):**
   - Log in to your admin panel
   - Navigate to "Payment Settings" tab
   - Click "Export Settings" button
   - Save the downloaded JSON file

2. **Import Settings (Target Device):**
   - Log in to your admin panel on the other device
   - Navigate to "Payment Settings" tab
   - Click "Import Settings" button
   - Select the JSON file you downloaded earlier
   - Click "Save Settings" to apply the imported settings

## Why This Approach?

Since GiftEase is deployed as a frontend-only application on Vercel:
- No backend server is available for data storage
- localStorage is device-specific by design
- This export/import solution provides a simple way to manually sync settings

## Future Improvements

For a more seamless experience, consider:
1. Adding a backend service (Firebase, Supabase, etc.)
2. Using a cloud storage solution for automatic sync
3. Implementing a simple API for settings storage

## Troubleshooting

If settings don't appear to sync:
1. Ensure you've clicked "Save Settings" after importing
2. Refresh the payment pages to see updated settings
3. Check browser console for any JavaScript errors
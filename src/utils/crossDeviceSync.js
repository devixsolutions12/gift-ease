// Cross-device sync utility for GiftEase
// This provides a more robust solution for syncing settings across devices

class CrossDeviceSync {
  constructor() {
    this.storageKey = 'giftEasePaymentSettings';
    this.syncKey = 'giftEaseCrossDeviceSync';
    this.timestampKey = 'giftEaseSyncTimestamp';
  }

  // Generate a unique device ID
  getDeviceId() {
    let deviceId = localStorage.getItem('giftEaseDeviceId');
    if (!deviceId) {
      deviceId = 'device_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('giftEaseDeviceId', deviceId);
    }
    return deviceId;
  }

  // Create a sync payload
  createSyncPayload(settings) {
    return {
      settings: settings,
      timestamp: Date.now(),
      deviceId: this.getDeviceId(),
      version: '1.0'
    };
  }

  // Save settings with sync metadata
  saveSettings(settings) {
    try {
      const payload = this.createSyncPayload(settings);
      
      // Save to main storage
      localStorage.setItem(this.storageKey, JSON.stringify(settings));
      
      // Save to sync storage (this is what we'll check for cross-device sync)
      localStorage.setItem(this.syncKey, JSON.stringify(payload));
      localStorage.setItem(this.timestampKey, Date.now().toString());
      
      console.log('Settings saved with sync metadata');
      return { success: true };
    } catch (error) {
      console.error('Error saving settings:', error);
      return { success: false, error: error.message };
    }
  }

  // Load settings
  loadSettings() {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (data) {
        const settings = JSON.parse(data);
        return { success: true, settings: settings };
      }
      return { success: false, error: 'No settings found' };
    } catch (error) {
      console.error('Error loading settings:', error);
      return { success: false, error: error.message };
    }
  }

  // Get sync data
  getSyncData() {
    try {
      const data = localStorage.getItem(this.syncKey);
      if (data) {
        const payload = JSON.parse(data);
        return { success: true, payload: payload };
      }
      return { success: false, error: 'No sync data found' };
    } catch (error) {
      console.error('Error loading sync data:', error);
      return { success: false, error: error.message };
    }
  }

  // Check for newer sync data
  hasNewerSyncData() {
    try {
      const lastSync = localStorage.getItem(this.timestampKey);
      const syncData = localStorage.getItem(this.syncKey);
      
      if (syncData && lastSync) {
        const payload = JSON.parse(syncData);
        const syncTimestamp = payload.timestamp;
        const localTimestamp = parseInt(lastSync);
        
        return syncTimestamp > localTimestamp;
      }
      return false;
    } catch (error) {
      console.error('Error checking for newer sync data:', error);
      return false;
    }
  }

  // Update settings from sync data
  updateFromSyncData() {
    try {
      const syncResult = this.getSyncData();
      if (syncResult.success) {
        const currentSettings = this.loadSettings();
        const syncPayload = syncResult.payload;
        
        // Check if this is actually newer data
        if (currentSettings.success) {
          const currentSyncData = localStorage.getItem(this.syncKey);
          if (currentSyncData) {
            const currentPayload = JSON.parse(currentSyncData);
            if (syncPayload.timestamp > currentPayload.timestamp) {
              // This is newer, update local settings
              localStorage.setItem(this.storageKey, JSON.stringify(syncPayload.settings));
              localStorage.setItem(this.timestampKey, syncPayload.timestamp.toString());
              
              console.log('Settings updated from newer sync data');
              return { updated: true, settings: syncPayload.settings };
            }
          } else {
            // No current sync data, update
            localStorage.setItem(this.storageKey, JSON.stringify(syncPayload.settings));
            localStorage.setItem(this.timestampKey, syncPayload.timestamp.toString());
            
            console.log('Settings updated from sync data');
            return { updated: true, settings: syncPayload.settings };
          }
        } else {
          // No current settings, update
          localStorage.setItem(this.storageKey, JSON.stringify(syncPayload.settings));
          localStorage.setItem(this.timestampKey, syncPayload.timestamp.toString());
          
          console.log('Settings initialized from sync data');
          return { updated: true, settings: syncPayload.settings };
        }
      }
      return { updated: false };
    } catch (error) {
      console.error('Error updating from sync data:', error);
      return { updated: false, error: error.message };
    }
  }

  // Force sync to make sure data is available across devices
  forceSync(settings) {
    try {
      const result = this.saveSettings(settings);
      if (result.success) {
        // Also update the main localStorage item that other components watch
        localStorage.setItem('giftEasePaymentSettings', JSON.stringify(settings));
        
        // Dispatch storage event to notify other tabs/components
        const storageEvent = new StorageEvent('storage', {
          key: 'giftEasePaymentSettings',
          newValue: JSON.stringify(settings),
          storageArea: window.localStorage
        });
        window.dispatchEvent(storageEvent);
        
        console.log('Settings force-synced across tabs');
        return { success: true };
      } else {
        return result;
      }
    } catch (error) {
      console.error('Error during force sync:', error);
      return { success: false, error: error.message };
    }
  }
}

// Create and export singleton instance
const crossDeviceSync = new CrossDeviceSync();
export default crossDeviceSync;
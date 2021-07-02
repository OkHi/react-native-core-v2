import UIKit
import OkCore

@objc(ReactNativeCore)
class ReactNativeCore: NSObject {
    
    private let okhiLocationService = OkHiLocationService()
    
    private var credentials: NSDictionary?
    private var resolve: RCTPromiseResolveBlock?
    
    private enum LocationPermissionRequestType: String {
      case whenInUse = "whenInUse"
      case always = "always"
    }
    private var locationPermissionRequestType: LocationPermissionRequestType = .always
    
    @objc static func requiresMainQueueSetup() -> Bool {
        return false
    }
    
    @objc func initialize(_ branchId: String, clientKey: String, environment: String, resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
        credentials = [ "branchId": branchId, "clientKey": clientKey, "environment": environment ]
        resolve(true)
    }
    
    @objc func isLocationPermissionGranted(_ resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
        resolve(okhiLocationService.isLocationPermissionGranted())
    }
    
    @objc func isBackgroundLocationPermissionGranted(_ resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
        resolve(okhiLocationService.isLocationPermissionGranted()) // TODO: need isBackgroundLocationPermissionGranted
    }
    
    @objc func isLocationServicesEnabled(_ resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
        resolve(okhiLocationService.isLocationServicesAvailable())
    }
    
    @objc func openLocationServicesSettings (_ resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
        UIApplication.shared.open(URL(string:UIApplication.openSettingsURLString)!)
    }
    
    @objc func requestEnableLocationServices (_ resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
        UIApplication.shared.open(URL(string:UIApplication.openSettingsURLString)!)
    }
    
    @objc func getSDKVersion(_ resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
        resolve(UIDevice.current.systemVersion)
    }
    
    @objc func requestLocationPermission(_ resolve:@escaping RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
        locationPermissionRequestType = .whenInUse
        okhiLocationService.delegate = self
        self.resolve = resolve
        okhiLocationService.requestLocationPermission(withBackgroundLocationPermission: false)
    }
    
    @objc func requestBackgroundLocationPermission(_ resolve:@escaping RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
        locationPermissionRequestType = .always
        okhiLocationService.delegate = self
        self.resolve = resolve
        okhiLocationService.requestLocationPermission(withBackgroundLocationPermission: true)
    }
}


extension ReactNativeCore: OkHiLocationServiceDelegate {
    func okHiLocationService(locationService: OkHiLocationService, didChangeLocationPermissionStatus locationPermissionType: LocationPermissionType, result: Bool) {
        guard let resolve = resolve else { return }
        if locationPermissionRequestType == .whenInUse {
            if locationPermissionType == .whenInUse {
                resolve(result)
            }
        } else if locationPermissionRequestType == .always {
            if locationPermissionType == .always {
                resolve(result)
            }
        }
    }
}

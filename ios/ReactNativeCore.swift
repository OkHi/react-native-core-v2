import Foundation

@objc(ReactNativeCore)
class ReactNativeCore: NSObject {
    
    var credentials: NSDictionary?
    
    @objc(multiply:withB:withResolver:withRejecter:)
    func multiply(a: Float, b: Float, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        resolve(a*b)
    }
    
    @objc func initialize(_ branchId: String, clientKey: String, environment: String, resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) {
        credentials = [
            "branchId": branchId,
            "clientKey": clientKey,
            "environment": environment
        ]
        resolve(true)
    }
}

({
    getAccounts : function(component) {
        var action = component.get("c.getAccounts");
        var self = this;
        action.setCallback(this, function(actionResult) {
            var state = actionResult.getState();
            if (component.isValid() && state === "SUCCESS") {
                component.set("v.accounts", actionResult.getReturnValue());
            }            
        });
        $A.enqueueAction(action);
    },
    
    initAccountRecordCreator: function(component) {
    	 component.find("accountRecordCreator").getNewRecord(
            "Account", // sObject type (objectApiName)
            null,      // recordTypeId
            false,     // skip cache?
            $A.getCallback(function() {
                var rec = component.get("v.record");
                var error = component.get("v.recordError");
                if(error || (rec === null)) {
                    console.log("Error initializing record template: " + error);
                    return;
                }
                console.log("Record template initialized: " + rec.apiName);
            })
        );
	}
})
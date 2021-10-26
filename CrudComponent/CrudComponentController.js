({
    doInit : function(component, event, helper) { 
        $A.util.addClass(component.find("divForm"), "slds-hide");
        helper.getAccounts(component);
        // Prepare a new record from template
        helper.initAccountRecordCreator(component);
    },

    handleChange: function (cmp, event, helper) {
        //Do something with the change handler
        var accId = event.getParam('value');
       cmp.set("v.recordId",accId);
       cmp.find("accountRecordCreator").reloadRecord();       
    },

    handleDeleteRecord: function(component, event, helper) {
        confirm('Are you sure to delete this record?');
        component.find("accountRecordCreator").deleteRecord($A.getCallback(function(deleteResult) {
            // NOTE: If you want a specific behavior(an action or UI behavior) when this action is successful 
            // then handle that in a callback (generic logic when record is changed should be handled in recordUpdated event handler)
            
            if (deleteResult.state === "SUCCESS" || deleteResult.state === "DRAFT") {
                alert('record deleted');
                window.location.reload();
            } else if (deleteResult.state === "INCOMPLETE") {
                console.log("User is offline, device doesn't support drafts.");
                alert("User is offline, device doesn't support drafts.");
            } else if (deleteResult.state === "ERROR") {
                console.log('Problem deleting record, error: ' + JSON.stringify(deleteResult.error));
                alert('An error was ocurred' + JSON.stringify(deleteResult.error));
            } else {
                console.log('Unknown problem, state: ' + deleteResult.state + ', error: ' + JSON.stringify(deleteResult.error));
            	alert('An error was ocurred' + JSON.stringify(deleteResult.error));
            }
        }));
    },
    
    handleSaveRecord : function(component, event, helper) {
    	//if(helper.validateAccountForm(component)) {
            component.find("accountRecordCreator").saveRecord(function(saveResult) {
                if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                    // record is saved successfully
                   alert('record saved');
					//$A.get('e.force:refreshView').fire();
					window.location.reload();
                } else if (saveResult.state === "INCOMPLETE") {
                    // handle the incomplete state
                    console.log("User is offline, device doesn't support drafts.");
                } else if (saveResult.state === "ERROR") {
                    // handle the error state
                    console.log('Problem saving account, error: ' + JSON.stringify(saveResult.deleteResult.error[0].message));
                } else {
                    console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.deleteResult.error[0].message));
                }
            });
       // }
	},
    
    handleChangeAction: function(component, event, helper) {
        $A.util.addClass(component.find("divForm"), "slds-hide");
        var action = event.getParam('value');
        if(action == 'create') {
            helper.initAccountRecordCreator(component);
        }else{
             component.set("v.accId",'');
        }
        //component.find("accountRecordCreator").reloadRecord();
    },
    
    showForm: function(component, event, helper) {
        var toggleText = component.find("divForm");
        $A.util.removeClass(component.find("divForm"), "slds-hide");
    }
})
//////////////////////////////////////////
// getAllVraVmsForUser.action
//
// Input: userX (string)
// Output: Array/vCAC:VirtualMachine
//////////////////////////////////////////

// Choosing VCACHost - [0] Default
var vcacHosts = Server.findAllForType("vCAC:vCACHost");
var vcacHost = vcacHosts[0];

// The requested User
System.log("requestedFor: " + userX);

// Init the Array
var userVMs = [];

var properties = new Properties();
properties.put("IsManaged", true);
var entities = vCACEntityManager.readModelEntitiesByCustomFilter(vcacHost.id, "ManagementModelEntities.svc", "VirtualMachines", properties, null);

for each( var entity in entities) 
{
	var ownerEntity = entity.getLink(vcacHost , "Owner")[0];
	var ownerName = ownerEntity.getProperty("UserName");
	System.log("ownerName: " + ownerName);
	if(ownerName.indexOf(userX) === 0)
	{
		userVMs.push(entity.getInventoryObject());
	}
}

if(userVMs == null)
{
return [];
}

return userVMs;

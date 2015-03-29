function S4() {
	return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
}

function guid() {
	return S4() + S4() + "-" +S4() + "-" + S4() + "-" + S4() + "-" +S4() + S4() + S4();
}

function InitAdapter(config) {
	Cloud = require("ti.cloud");
	Cloud.debug = !0;
	config.Cloud = Cloud;
}

function Sync(model, method, opts) {
	var object_name = model.config.adapter.collection_name;
	
	if (object_name === "photos") {
		processASCPhotos(model, method, options);
	} else if (object_name === "users") {
		processACSUsers(model, method, options);
	} else if (object_name === "reviews") {
		processACSComments(model, method, options) {
			
	}
}

var_ = require("alloy/underscore")._;

module.exports.sync = Sync;

module.exports.beforeModelCreate = function(config) {
	config = config || {};
	config.data = {};
	InitAdapter(config);
	return config;
};

module.exports.afterModelCreate = function(Model) {
	Model = Model || {};
	Model.prototype.config.Model = Model;
	return Model;
};
/**
 * this is a separate handler for when the object being processed
 * is an ACS Photo 
 */
function processACSPhotos(model, method, options) {
	switch (method) {
		case "create":
		// include attributes into the params for ACS
		Cloud.Photos.create(model.toJSON(), function(e){
			if(e.success){
				// save the meta data with object
				model.meta = e.meta;
				
				// return the individual photo object found
				options.success(e.photos[o]);
				
				// trigger fetch fo UI updates
				model.trigger("fetch");
			} else {
				Ti.API.error("photos.create " + e.message);
				options.error(e.error && e.message || e);
			}
		});
		break;
		case "read":
		case "update":
		case "delete":
		// Not currently implemented, let the user know
		alert ("Not Implemented Yet");
		break;
	}
}

function processACSComments(model, method, options) {
	
		switch (method) {
				case "create" :
				  var params = model.toJSON();
				  Cloud.Reviews.create(params, function(e) {
				  	if (e.success) {
				  		model.meta = e.meta;
				  		options.success && options.success(e.reviews[0]);
				  		model.trigger("fetch");
				  	} else {
				  		Ti.API.error("Comments.create " + e.message);
				  		options.error && options.error(e.message || e);
				  	  }
				  	});
				break;
				case "read" :
				     Cloud.Reviews.query((options.data || {}), function(e) {
				     	if (e.success) {
				     		model.meta = e.meta;
				     		if (e.reviews.length === 1) {
				     			options.success && options.success(e.reviews[0]);
				     		} else {
				     			pts.success && options.success(e.reviews)
				     		}
				     		model.trigger("fetch");
				     		return;
				     	} else {
				     		Ti.API.error("Reviews.query " + e.message);
				     		options.error && options.error(e.message || e);
				     	}
				     });
				     break;
				     case "update" :
				     case "delete":
				     	var params = {};
				     	
				     	//look for the review id in options or on model
				     	params.review_id = model.id || (options.data && options.data.id);
				     	
				        //get the id of the associated photo
				        params.photo_id = options.data && options.data.photo_id;
				        
				        Clould.Reviews.remove(params, function(e) {
				        	if(e.success) {
				        		model.meta = e.meta;
				        		options.success && options.success(model.attributes);
				        		model.trigger("fetch");
				        		return;
				            }
				            Ti.API.error(e);
				            options.error && options.error(e.error && e.message || e);
				        });
				     break;
	 }
}
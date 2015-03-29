var args = arguments[0] || {};
$.image.image = model.attributes.urls.preview;
$.titleLabel.text = args.title || "";
$.row.row_id = model.id || '';
$.feedTable.addEventListener("click", processTableClicks);

function processTableClicks(_event) {
	if (_event.source.id === "commentButton") {
		handleCommentButtonClicked(_event);
	} else if (_event.source.id === "shareButton") {
		alert('Will do this later!!');
	}
}

function handleCommentButtonClicked(_event) {
	var collection = Alloy.Collections.instance("Photo");
	var model = collection.get(_event.row.row_id);
	
	var controller = Alloy.createController("comment", {
		photo : model,
		parentController : $
	});
	
	//initialize the data in the view, load content
	controller.initialize();
	
	//open the view
	Alloy.Globals.openCurrentTabWindow(controller.getView());
}

//var args = arguments[0] || {};

// this is setting the view elements of the row view
// based on the arguments passed into the contrller
//$.image.image = args.image;
//$.titleLabel.text = args.title || ";
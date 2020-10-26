sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/m/Dialog'
], function (Controller, Dialog) {
	"use strict";

	return Controller.extend("com.sap.Camera.controller.View1", {
		onInit: function () {

		},
		TakePhoto: function () {
			// Step 1: Create a popup variable as a global variable
			var that = this;
			this.fixedDialog = new Dialog({
				title: "Click on capture to take Photo",
				beginButton: new sap.m.Button({
					text: "Capture",
					press: function () {
						//TO DO: get the object of our video player which live camera is running
						that.imageVal = document.getElementById("player");
						//take the image object out of it and set to main page using global variable
						that.fixedDialog.close();
					}
				}),
				content: [
					new sap.ui.core.HTML({
						content: "<video id='player' autoplay/>"
					}),
					new sap.m.Input({
						placeholder: "Enter description"
					})
				],
				endButton: new sap.m.Button({
					text: "Cancel",
					press: function () {
						that.fixedDialog.close();
					}
				})
			});

			this.getView().addDependent(this.fixedDialog);
			this.fixedDialog.open();
			this.fixedDialog.attachBeforeClose(this.setImage, this);
			var handleSuccess = function (stream) {
				player.srcObject = stream;
			};
			navigator.mediaDevices.getUserMedia({
				video: true
			}).then(handleSuccess);
			// Step 2: Launch the popup
		},
		setImage: function () {
			//Take the running image from video stream of camera
			var oVox = this.getView().byId("wow");
			var oItems = oVox.getItems();
			var snapId = "Image" + oItems.length;
			var textId = snapId + "-text";
			var imageVal = this.imageVal;

			//set that as a canvas element on HTML page

			var oCanvas = new sap.ui.core.HTML({
				content: "<canvas id='" + snapId + "' width='320px' height='320px'" +
					"style='2px solid red'></canvas>" +
					"<label id='" + textId + "'>" + this.attachName + "</label>"
			});
			oVox.addItem(oCanvas);
			oCanvas.addEventDelegate({
				onAfterRenderering: function () {
					var snapShotCanvas = document.getElementById(snapId);
					var oContext = snapShotCanvas.getContext('2d');
					oContext.drawImage(imageVal, 0, 0, snapShotCanvas.width, snapShotCanvas.height);
				}
			});

		}
	});
});
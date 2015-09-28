var canvas;
var tshirts = new Array();
var a;
var b;
var line1;
var line2;
var line3;
var line4;
var lebarDesain = 135;
var tinggiDesain = 250;

$(function(){
    $('#file_upload').uploadify({
        'swf'      : 'uploadify.swf',
        'uploader' : 'uploadify.php',
        'onUploadSuccess' : function(file, data, response) {
            var data = '<img style="cursor:pointer;" class="img-polaroid" src="'+data+'" onCLick="appendImage($(this).attr(\'src\'));">';
            $('#avatarlist').append(data);
        }
    });
    $('.color-preview').click(function(){
       var color = $(this).css("background-color");
       document.getElementById("shirtDiv").style.backgroundColor = color;		   
   });

   $('#flip').click(function() {			   
        var idBaju = $('#gantiBaju').val();
        var bajuDepan = ['', 'img/kaospendek_depan.png', 'img/kaospanjang_depan.png'];
        var bajuBlkng = ['', 'img/kaospendek_belakang.png', 'img/kaospanjang_belakang.png'];
            if ($(this).attr("data-original-title") == "Show Back View") {
                $(this).attr('data-original-title', 'Show Front View');			        		       
                $("#tshirtFacing").attr("src", bajuBlkng[idBaju]);
                a = JSON.stringify(canvas);
                canvas.clear();
                try
                {
                   var json = JSON.parse(b);
                   canvas.loadFromJSON(b);
                }
                catch(e)
                {}
                
            } else {
                $(this).attr('data-original-title', 'Show Back View');			    				    	
                $("#tshirtFacing").attr("src", bajuDepan[idBaju]);
                b = JSON.stringify(canvas);
                canvas.clear();
                try
                {
                   var json = JSON.parse(a);
                   canvas.loadFromJSON(a);			           
                }
                catch(e)
                {}
            }		
            canvas.renderAll();
            setTimeout(function() {
                canvas.calcOffset();
            },lebarDesain);			   	
    });	   


    //setup front side canvas 
    canvas = new fabric.Canvas('tcanvas', {
      hoverCursor: 'pointer',
      selection: true,
      selectionBorderColor:'blue'
    });
    canvas.on({
         'object:moving': function(e) {		  	
            e.target.opacity = 0.5;
          },
          'object:modified': function(e) {		  	
            e.target.opacity = 1;
          },
         'object:selected':onObjectSelected,
         'selection:cleared':onSelectedCleared
     });
    // piggyback on `canvas.findTarget`, to fire "object:over" and "object:out" events
    canvas.findTarget = (function(originalFn) {
      return function() {
        var target = originalFn.apply(this, arguments);
        if (target) {
          if (this._hoveredTarget !== target) {
              canvas.fire('object:over', { target: target });
            if (this._hoveredTarget) {
                canvas.fire('object:out', { target: this._hoveredTarget });
            }
            this._hoveredTarget = target;
          }
        }
        else if (this._hoveredTarget) {
            canvas.fire('object:out', { target: this._hoveredTarget });
          this._hoveredTarget = null;
        }
        return target;
      };
    })(canvas.findTarget);
    
    canvas.on('object:over', function(e) {		
      //e.target.setFill('red');
      //canvas.renderAll();
    });
    
    canvas.on('object:out', function(e) {		
      //e.target.setFill('green');
      //canvas.renderAll();
    });
		 		 	 
    document.getElementById('add-text').onclick = function() {
        var text = $("#text-string").val();
        var textSample = new fabric.Text(text, {
          left: fabric.util.getRandomInt(0, lebarDesain),
          top: fabric.util.getRandomInt(0, tinggiDesain),
          fontFamily: 'helvetica',
          angle: 0,
          fill: '#000000',
          scaleX: 0.5,
          scaleY: 0.5,
          fontWeight: '',
          hasRotatingPoint:true
        });		    
        canvas.add(textSample);	
        canvas.item(canvas.item.length-1).hasRotatingPoint = true;    
        $("#texteditor").css('display', 'block');
        $("#imageeditor").css('display', 'block');
    };

    $("#text-string").keyup(function(){	  		
        var activeObject = canvas.getActiveObject();
          if (activeObject && activeObject.type === 'text') {
              activeObject.text = this.value;
              canvas.renderAll();
          }
    });
    $(".img-polaroid").click(function(e){
        appendImage($(this).attr('src'));
    });	  		  
    $('#remove-selected').click(function() {		  
        var activeObject = canvas.getActiveObject(),
            activeGroup = canvas.getActiveGroup();
        if (activeObject) {
          canvas.remove(activeObject);
          $("#text-string").val("");
        }
        else if (activeGroup) {
          var objectsInGroup = activeGroup.getObjects();
          canvas.discardActiveGroup();
          objectsInGroup.forEach(function(object) {
            canvas.remove(object);
          });
        }
    });
   $('#bring-to-front').click(function() {		  
        var activeObject = canvas.getActiveObject(),
            activeGroup = canvas.getActiveGroup();
        if (activeObject) {
          activeObject.bringToFront();
        }
        else if (activeGroup) {
          var objectsInGroup = activeGroup.getObjects();
          canvas.discardActiveGroup();
          objectsInGroup.forEach(function(object) {
            object.bringToFront();
          });
        }
    });
    $('#send-to-back').click(function() {		  
        var activeObject = canvas.getActiveObject(),
            activeGroup = canvas.getActiveGroup();
        if (activeObject) {
          activeObject.sendToBack();
        }
        else if (activeGroup) {
          var objectsInGroup = activeGroup.getObjects();
          canvas.discardActiveGroup();
          objectsInGroup.forEach(function(object) {
            object.sendToBack();
          });
        }
    });		  
    $("#text-bold").click(function() {		  
        var activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'text') {
            activeObject.fontWeight = (activeObject.fontWeight == 'bold' ? '' : 'bold');		    
            canvas.renderAll();
        }
    });
    $("#text-italic").click(function() {		 
        var activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'text') {
            activeObject.fontStyle = (activeObject.fontStyle == 'italic' ? '' : 'italic');		    
            canvas.renderAll();
        }
    });
    $("#text-underline").click(function() {		  
        var activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'text') {
            activeObject.textDecoration = (activeObject.textDecoration == 'underline' ? '' : 'underline');
            canvas.renderAll();
        }
    });
    $("#font-family").change(function() {
        var activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'text') {
            activeObject.fontFamily = this.value;
            canvas.renderAll();
        }
    });	  
    $('#text-fontcolor').ColorPicker({
        color: '#000000',
        onShow: function (colpkr) {
            $(colpkr).fadeIn(500);
            return false;
        },
        onHide: function (colpkr) {
            $(colpkr).fadeOut(500);
            return false;
        },
        onChange: function (hsb, hex, rgb) {
            var activeObject = canvas.getActiveObject();
            if (activeObject && activeObject.type === 'text') {
                activeObject.fill = '#'+hex;
                canvas.renderAll();
            }
        }
    });
    $('#text-bgcolor').ColorPicker({
        color: '#FFFFFF',
        onShow: function (colpkr) {
            $(colpkr).fadeIn(500);
            return false;
        },
        onHide: function (colpkr) {
            $(colpkr).fadeOut(500);
            return false;
        },
        onChange: function (hsb, hex, rgb) {
            var activeObject = canvas.getActiveObject();
            if (activeObject && activeObject.type === 'text') {
                activeObject.backgroundColor = '#'+hex;
                canvas.renderAll();
            }
        }
    });
    $('#text-strokecolor').ColorPicker({
        color: '#FFFFFF',
        onShow: function (colpkr) {
            $(colpkr).fadeIn(500);
            return false;
        },
        onHide: function (colpkr) {
            $(colpkr).fadeOut(500);
            return false;
        },
        onChange: function (hsb, hex, rgb) {
            var activeObject = canvas.getActiveObject();
            if (activeObject && activeObject.type === 'text') {
                activeObject.strokeStyle = '#'+hex;
                canvas.renderAll();
            }
        }
    });
    $("#drawingArea").hover(
        function() { 	        	
             canvas.add(line1);
             canvas.add(line2);
             canvas.add(line3);
             canvas.add(line4); 
             canvas.renderAll();
        },
        function() {	        	
             canvas.remove(line1);
             canvas.remove(line2);
             canvas.remove(line3);
             canvas.remove(line4);
             canvas.renderAll();
        }
    );
	   
    $(".clearfix button,a").tooltip();
    line1 = new fabric.Line([0,0,lebarDesain,0], {"stroke":"#000000", "strokeWidth":1,hasBorders:false,hasControls:false,hasRotatingPoint:false,selectable:false});
    line2 = new fabric.Line([lebarDesain-1,0,lebarDesain,tinggiDesain-1], {"stroke":"#000000", "strokeWidth":1,hasBorders:false,hasControls:false,hasRotatingPoint:false,selectable:false});
    line3 = new fabric.Line([0,0,0,tinggiDesain], {"stroke":"#000000", "strokeWidth":1,hasBorders:false,hasControls:false,hasRotatingPoint:false,selectable:false});
    line4 = new fabric.Line([0,tinggiDesain,lebarDesain,tinggiDesain-1], {"stroke":"#000000", "strokeWidth":1,hasBorders:false,hasControls:false,hasRotatingPoint:false,selectable:false});

});

function getRandomNum(min, max) {
    return Math.random() * (max - min) + min;
}

function onObjectSelected(e) {	 
    var selectedObject = e.target;
    $("#text-string").val("");
    selectedObject.hasRotatingPoint = true
    if (selectedObject && selectedObject.type === 'text') {
        //display text editor	    	
        $("#texteditor").css('display', 'block');
        $("#text-string").val(selectedObject.getText());
        /*
        $('#text-fontcolor').miniColors('value',selectedObject.fill);
        $('#text-strokecolor').miniColors('value',selectedObject.strokeStyle);	
        */
        $("#imageeditor").css('display', 'block');
    }
    else if (selectedObject && selectedObject.type === 'image'){
        //display image editor
        $("#texteditor").css('display', 'none');	
        $("#imageeditor").css('display', 'block');
    }
}

function onSelectedCleared(e){
    $("#texteditor").css('display', 'none');
    $("#text-string").val("");
    $("#imageeditor").css('display', 'none');
}

function setFont(font){
    var activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'text') {
        activeObject.fontFamily = font;
        canvas.renderAll();
    }
}

function removeWhite(){
    var activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'image') {			  
        activeObject.filters[2] =  new fabric.Image.filters.RemoveWhite({hreshold: 100, distance: 10});//0-255, 0-255
        activeObject.applyFilters(canvas.renderAll.bind(canvas));
    }	        
}

function appendImage(ethis){
    var el = ethis;
    /*temp code*/
    var offset = 50;
    var left = fabric.util.getRandomInt(0 + offset, lebarDesain - offset);
    var top = fabric.util.getRandomInt(0 + offset, tinggiDesain - offset);
    var angle = fabric.util.getRandomInt(-20, 40);
    var width = fabric.util.getRandomInt(30, 50);
    var opacity = (function(min, max){ return Math.random() * (max - min) + min; })(0.5, 1);
    
    fabric.Image.fromURL(el, function(image) {
          image.set({
            left: left,
            top: top,
            angle: 0,
            padding: 10,
            cornersize: 10,
            hasRotatingPoint:true
          });
          image.scale(getRandomNum(0.1, 0.25)).setCoords();
          canvas.add(image);
        });
}
function gantiBaju(idBaju){
    var bajuDepan = ['', 'img/kaospendek_depan.png', 'img/kaospanjang_depan.png'];
    var bajuBlkng = ['', 'img/kaospendek_belakang.png', 'img/kaospanjang_belakang.png'];
    var srcBaju = $("#tshirtFacing").attr("src");

    if(jQuery.inArray( srcBaju, bajuDepan ) >= 0){
        $("#tshirtFacing").attr("src", bajuDepan[idBaju]);
    }else{
        $("#tshirtFacing").attr("src", bajuBlkng[idBaju]);
    }
}
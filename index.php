<!DOCTYPE html>
<html>

<head>

    <!--meta http-equiv="refresh" content="1"-->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Chanif | Males design</title>

    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="font-awesome/css/font-awesome.min.css" rel="stylesheet">
	<link href="colorpicker/css/colorpicker.css" rel="stylesheet">
    <link media="screen" href="colorpicker/css/layout.css" rel="stylesheet">
    <link href="bootstrap/css/uploadify.css" rel="stylesheet">
    <link href="bootstrap/css/style.css" rel="stylesheet">

    <script type="text/javascript" src="bootstrap/js/jquery-2.1.3.js"></script>
    <script type="text/javascript" src="bootstrap/js/fabric.js"></script>
	<script type="text/javascript" src="colorpicker/js/colorpicker.js"></script>
    <script type="text/javascript" src="colorpicker/js/eye.js"></script>
    <script type="text/javascript" src="colorpicker/js/utils.js"></script>
    <script type="text/javascript" src="bootstrap/js/jquery.uploadify.min.js"></script>
</head>

<body>

<div class="container">
    <div class="row">
        <div class="col-xs-12">
            <h3 style="font-size:30px;margin: 15px;font-weight:bolder;">Males Desain</h3>
            <hr>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-6">
            <ul class="nav nav-tabs">
                <li class="active"><a href="#tab1" data-toggle="tab">Pilihan</a></li>                    
                <li><a href="#tab2" data-toggle="tab">Modifikasi</a></li>
            </ul>
            <div class="tab-content">
                <div class="tab-pane active" id="tab1">
                    <button id="flip" class="btn btn-info form-control" style="margin: 15px 0;" data-original-title="Show Back View">Balik desain</button>
                    
                    <select id="gantiBaju" class="form-control" style="margin: 0 0 15px 0;" onChange="gantiBaju($(this).val());">
                        <option value="1" selected="selected">Kaos Lengan Pendek</option>
                        <option value="2">Kaos Lengan Panjang</option>
                    </select>

                    <div>
                        <span class="color-preview" title="White" style="background-color:#ffffff;"></span>
                        <span class="color-preview" title="Dark Heather" style="background-color:#616161;"></span>
                        <span class="color-preview" title="Gray" style="background-color:#f0f0f0;"></span>
                        <span class="color-preview" title="Charcoal" style="background-color:#5b5b5b;"></span>
                        <span class="color-preview" title="Black" style="background-color:#222222;"></span>
                        <span class="color-preview" title="Heather Orange" style="background-color:#fc8d74;"></span>
                        <span class="color-preview" title="Heather Dark Chocolate" style="background-color:#432d26;"></span>
                        <span class="color-preview" title="Salmon" style="background-color:#eead91;"></span>
                        <span class="color-preview" title="Chesnut" style="background-color:#806355;"></span>
                        <span class="color-preview" title="Dark Chocolate" style="background-color:#382d21;"></span>
                        <span class="color-preview" title="Citrus Yellow" style="background-color:#faef93;"></span>
                        <span class="color-preview" title="Avocado" style="background-color:#aeba5e;"></span>
                        <span class="color-preview" title="Kiwi" style="background-color:#8aa140;"></span>
                        <span class="color-preview" title="Irish Green" style="background-color:#1f6522;"></span>
                        <span class="color-preview" title="Scrub Green" style="background-color:#13afa2;"></span>
                        <span class="color-preview" title="Teal Ice" style="background-color:#b8d5d7;"></span>
                        <span class="color-preview" title="Heather Sapphire" style="background-color:#15aeda;"></span>
                        <span class="color-preview" title="Sky" style="background-color:#a5def8;"></span>
                        <span class="color-preview" title="Antique Sapphire" style="background-color:#0f77c0;"></span>
                        <span class="color-preview" title="Heather Navy" style="background-color:#3469b7;"></span>                            
                        <span class="color-preview" title="Cherry Red" style="background-color:#c50404;"></span>
                    </div>
                </div>                   
                <div class="tab-pane" id="tab2">
                    <div class="input-group" style="margin-top: 15px;">
                        <input id="text-string" class="form-control" type="text" placeholder="Tambahkan Tulisan...">
                        <div class="input-group-addon" id="add-text" style="background-color: #29A9DF;color: #FFF;cursor: pointer;">Tambah</div>
                    </div>

                    <div style="margin-top: 15px;font-weight: bolder;">Data Gambar</div>
                    <hr>
                    <input type="file" name="file_upload" id="file_upload">
                    <div id="avatarlist" class="text-center">
                        <img style="cursor:pointer;" class="img-polaroid" src="img/jquery.png">
                        <img style="cursor:pointer;" class="img-polaroid" src="img/css3.png">
                        <img style="cursor:pointer;" class="img-polaroid" src="img/html5.png">
                    </div>                            
                </div>
            </div>
        </div>
        <div class="col-xs-6">
            <div id="shirtDiv" class="page" style="width: 300px; height: 325px; position: relative; left: 40px; background-color: rgb(255, 255, 255);">
                <img id="tshirtFacing" src="img/kaospendek_depan.png" style="width: 300px; height: 325px;"></img>
                <div id="drawingArea" style="position: absolute;top: 40px;left: 81px;z-index: 10;width: 135px;height: 250px;">					
                    <canvas id="tcanvas" width="135" height="250" class="hover" style="-webkit-user-select: none;"></canvas>
                </div>
            </div>
            
            <div id="texteditor" style="display:none">
                <div class="btn-group" role="group">                          
                    <button id="font-family" class="btn dropdown-toggle" data-toggle="dropdown" title="Font Style"><i class="fa fa-font" style="width:19px;height:19px;"></i></button>                              
                    <ul class="dropdown-menu" role="menu" aria-labelledby="font-family-X">
                        <li><a tabindex="-1" href="#" onclick="setFont('Arial');" class="Arial">Arial</a></li>
                        <li><a tabindex="-1" href="#" onclick="setFont('Helvetica');" class="Helvetica">Helvetica</a></li>
                        <li><a tabindex="-1" href="#" onclick="setFont('Myriad Pro');" class="MyriadPro">Myriad Pro</a></li>
                        <li><a tabindex="-1" href="#" onclick="setFont('Delicious');" class="Delicious">Delicious</a></li>
                        <li><a tabindex="-1" href="#" onclick="setFont('Verdana');" class="Verdana">Verdana</a></li>
                        <li><a tabindex="-1" href="#" onclick="setFont('Georgia');" class="Georgia">Georgia</a></li>
                        <li><a tabindex="-1" href="#" onclick="setFont('Courier');" class="Courier">Courier</a></li>
                        <li><a tabindex="-1" href="#" onclick="setFont('Comic Sans MS');" class="ComicSansMS">Comic Sans MS</a></li>
                        <li><a tabindex="-1" href="#" onclick="setFont('Impact');" class="Impact">Impact</a></li>
                        <li><a tabindex="-1" href="#" onclick="setFont('Monaco');" class="Monaco">Monaco</a></li>
                        <li><a tabindex="-1" href="#" onclick="setFont('Optima');" class="Optima">Optima</a></li>
                        <li><a tabindex="-1" href="#" onclick="setFont('Hoefler Text');" class="Hoefler Text">Hoefler Text</a></li>
                        <li><a tabindex="-1" href="#" onclick="setFont('Plaster');" class="Plaster">Plaster</a></li>
                        <li><a tabindex="-1" href="#" onclick="setFont('Engagement');" class="Engagement">Engagement</a></li>
                    </ul>
                    <button id="text-bold" class="btn"><i class="fa fa-bold" style="width:19px;height:19px;"></i></button>
                    <button id="text-italic" class="btn"><i class="fa fa-italic" style="width:19px;height:19px;"></i></button>
                    <button id="text-underline" class="btn"><i class="fa fa-underline" style="width:19px;height:19px;"></i></button>                
                </div>
                <div class="btn-group" role="group">                          
                    <button id="text-fontcolor" class="btn">Warna Huruf</button>                
                    <button id="text-bgcolor" class="btn">Background Huruf</button>                
                    <button id="text-strokecolor" class="btn">Garis Huruf</button>                
                </div>
            </div>
            <div class="text-center" align="" id="imageeditor" style="display:none">
                <div class="btn-group">                                              
                    <button class="btn" id="bring-to-front" title="Bring to Front"><i class="fa fa-fast-backward rotate" style="height:19px;"></i></button>
                    <button class="btn" id="send-to-back" title="Send to Back"><i class="fa fa-fast-forward rotate" style="height:19px;"></i></button>
                    <button id="remove-selected" class="btn" title="Delete selected item"><i class="fa fa-trash" style="height:19px;"></i></button>
                </div>
            </div>              

        </div>
    </div>
</div>

<script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="bootstrap/js/js.js"></script>

<body>

</html>
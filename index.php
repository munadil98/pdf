

<!DOCTYPE html>
<html>
  <head>
    <title>PDF Draing Measumrent</title>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.8/p5.js"></script> -->
    <!-- <script src="http://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.8/p5.js"></script> -->

    <!-- Latest compiled and minified CSS for bootstrap -->
<!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"> -->

    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="css/jquery-ui.min.css">
    <script type="text/javascript" src="js/pdf.js"></script>
    <script type="text/javascript" src="js/pdf.worker.js"></script>
    <link rel="stylesheet" type="text/css" href="css/style.css?ver-2.5">

  </head>

  <body>

  <!-- nav bar menu -->
  <nav class="navbar navbar-default navbar-fixed-top topMenu">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">Floor Area Measurement</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li class="active"><button id="calibrate">Cali-Start</button><span class="sr-only">(current)</span></button></li>
        
        <li><div id="caldiv"><input type="number" id="calvalue" name="calibrate" value=1></div></li>
        <li><button id="reCalibrate">Calibrate</button></li>

        <!-- <li><button id="redraw">Redraw</button></li> -->
        <li><button onclick="javascript:cUndo();return false;">Undo</button></li>
        <li><button id="clear">Clear</button></li>
        <li><button id="clearAll">Clear All</button></li>
<!--         <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Color <span class="caret"></span></a>
          <ul class="dropdown-menu color">
            <li><div id="red"></div></li>
            <li><div id="yellow"></div></li>
            <li><div id="blue"></div></li>
            <li><div id="orange"></div></li>
            <li><div id="green"></div></li>
            <li><div id="grey"></div></li>
            <li><div id="pink"></div></li>
            <li><div id="purple"></div></li>
          </ul>
        </li> -->
      </ul>
      <form method="POST" action="index.php" enctype="multipart/form-data">
      <input type="file" name="fileToUpload" id="fileToUpload" class="hidden">
      <label for="fileToUpload">Select PDF file</label>
      <input type="submit" name="submit" id="upload" value="Upload">
    </form>
                  
      <ul class="nav navbar-nav navbar-right">
        <!-- <li><a href="#">Link</a></li> -->
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Color<span class="caret"></span></a>
          <ul class="dropdown-menu color">
            <li><div id="red"></div></li>
            <li><div id="yellow"></div></li>
            <li><div id="blue"></div></li>
            <li><div id="orange"></div></li>
            <li><div id="green"></div></li>
            <li><div id="grey"></div></li>
            <li><div id="pink"></div></li>
            <li><div id="purple"></div></li>
          </ul>
        </li>

        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Area<span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a type="button" id="poly" href="#">Polygon</a></li>
            <li><a type="button" id="square" href="#">Rectangle</a></li>
            <li><a type="button" id="triangle" class="triangle" href="#">Triangle</a></li>
            <li><a type="button" id="arc" class="arc" href="#">Arc</a></li>
            <li><a type="button" id="line" class="arc" href="#">Line</a></li>

          </ul>
        </li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
  <!-- nav bar menu -->



<section class="canvasArea">

  <div class="container">
    <div class="row">
      <div class="col-md-10">
          <div id="sketch-holder">
            <canvas id="canvas" width=1600 height=1200 ></canvas>

            <canvas id="canvasline" class="cursor"  width=1600 height=1200"></canvas>
            
            <div id="sketch"></div>
          </div>        
      </div>

    </div>
  </div>
</section>


<section class="measurementArea" id="content">
          
        <div class="panel panel-primary ui-widget-content"  id="draggable">
          <!-- Default panel contents -->
          <div class="panel-heading">Area Measurement</div>

          <!-- Table -->
          <table class="table" id="area">
            <tr>
              <th>SL</th>
              <th>Block</th>
              <th>Area</th>
            </tr>
            <tr>
              <td colspan="2">Total</td>
              <td id="totalArea"></td>
            </tr>
          </table>
                  <button id="dowmload">Download in PDF</button>
        </div>

        </div>
      </div>

</section>




          <!-- File upload
    =============================== -->
<?php
  $target_dir = "uploads/";
  $target_file = $target_dir . basename(@$_FILES["fileToUpload"]["name"]);
  // echo $target_file;
  ?>
  
  <input type="text" name="filedir" id="filedir" style="display: none" value="<?php echo $target_file; ?>">

  <?php
  $uploadOk = 1;
  $imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
  // Check if image file is a actual image or fake image
  // if(isset($_POST["submit"])) {
  //     $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
  //     if($check !== false) {
  //         echo "File is an image - " . $check["mime"] . ".";
  //         $uploadOk = 1;
  //     } else {
  //         echo "File is not an image.";
  //         $uploadOk = 0;
  //     }
  // }

  // Check if file already exists
  if (file_exists($target_file)) {
      // echo "Sorry, file already exists.";
      $uploadOk = 0;
  }
  // Check file size
  if (@$_FILES["fileToUpload"]["size"] > 5000000) {
      echo "Sorry, your file is too large.";
      $uploadOk = 0;
  }
  // Allow certain file formats
  if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
  && $imageFileType != "gif"&& $imageFileType != "pdf" ) {
      // echo "Sorry, only JPG, JPEG, PNG, GIF & PDF files are allowed.";
      $uploadOk = 0;
  }
  // Check if $uploadOk is set to 0 by an error
  if ($uploadOk == 0) {
      // echo "Sorry, your file was not uploaded.";
  // if everything is ok, try to upload file
  } else {
      if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
          echo "\"". basename( $_FILES["fileToUpload"]["name"]). " \" has been uploaded.";
      } else {
          echo "Sorry, there was an error uploading your file.";
      }
  }
?>

<!-- <script
  src="https://code.jquery.com/jquery-3.2.1.min.js"
  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
  crossorigin="anonymous"></script> -->
<script type="text/javascript" src="js/jquery-3.2.1.min.js"></script>
  <!-- Latest compiled and minified JavaScript -->
<!-- <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script> -->
<script type="text/javascript" src=js/bootstrap.min.js></script>
<script type="text/javascript" src=js/jquery-ui.min.js></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.9/p5.min.js"></script> -->

<script type="text/javascript" src="js/jspdf.debug.js"></script>

<script type="text/javascript" src="js/p5.min.js"></script>

<script type="text/javascript" src="pdfdemo.js?ver=2.9"></script>

<!-- <script type="text/javascript" src="js/undo.js"></script> -->


  </body>
</html>
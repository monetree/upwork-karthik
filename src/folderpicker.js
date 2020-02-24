<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>
<body>



<input type="file" id="flup" onchange="getfolder(event)" webkitdirectory mozdirectory msdirectory odirectory directory multiple />

<script type="text/javascript">
  function getfolder(e) {
    var files = e.target.files;
    var path = files[0].webkitRelativePath;
    var Folder = path.split("/");
    console.log(files)
    console.log(path)
  }
</script>
</body>
</html>


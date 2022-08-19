//todo - get good marks
//The URIs of the REST endpoint
MUA = "https://prod-04.uksouth.logic.azure.com:443/workflows/c0f4f79ff58b43cda934919e607e5044/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=vKRphQxlsl5VFI3rhZCcSbof36pf806EG_I0gPx04Mo";
RAMA  = "https://prod-22.centralus.logic.azure.com:443/workflows/39756725681e403093415169034d27f6/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=JccuA9rejnVV9xI2XWZO_zv-mCOtXe5QldDBVzOaNdc";
DMA0 = "https://prod-09.uksouth.logic.azure.com/workflows/e71e780122c0463ba0d8be6318e99a7c/triggers/manual/paths/invoke/";
DMA1 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=SPhnz4DJByW6Blj49wz2K6ADKouOeNcr1HsHl3AlJy8";
BLOB_ACCOUNT = "https://pokefansblob.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function () {


    $("#retImages").click(function () {
        //Run the get asset list function
        getImages();
    });

    $("#retVideos").click(function () {
        //Run the get asset list function
        getVideos();
    });

    $("#delMedia").click(function () {
        //Run the get asset list function
        deleteAsset();
    });

    //Handler for the new asset submission button
    $("#subNewForm").click(function () {

        //Execute the submit new asset function
        submitNewAsset();

    });
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset() {

    //Create a form data object
    submitData = new FormData();

    //Get form variables and append them to the form data object
    submitData.append('FileName', $('#FileName').val());
    submitData.append('userID', $('#userID').val());
    submitData.append('userName', $('#userName').val());
    submitData.append('File', $("#UpFile")[0].files[0]);

    //Post the form data  to the endpoint, note the need to set the content type header
    $.ajax({
        url: MUA,
        data: submitData,
        cache: false,
        enctype: 'multipart/form-data',
        contentType: false,
        processData: false,
        type: 'POST',
        success: function (html) {
            location.reload();
        }
    });

}


//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages() {

    //Replace the current HTML in that div with a loading message
    $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

    $.getJSON(RAMA , function (data) {

        //Create an array to hold all the retrieved assets
        var items = [];
        var idTest = [];
        var i = 0
        //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
        $.each(data, function (key, val) {
                idTest = (val["id"]);
                items.push("<hr />");
                items.push("<img src='" + BLOB_ACCOUNT + val["filePath"] + "'width='400'/> <br/>");
                items.push("File : " + val["fileName"] + "<br />");
                items.push("Uploaded by: " + val["userName"] + " (user id: " + val["userID"] + ")<br/>");
                items.push('Post ID = ' + idTest + ' <br/>');
            items.push('<button type="button" id="delMedia" class="btn btn-primary" onclick="deleteAsset('+""+idTest+""+')" >Delete</button><br/><br/>');
        
        });

        //Clear the assetlist div 
        $('#ImageList').empty();

        //Append the contents of the items array to the ImageList Div
        $("<ul/>", {
            "class": "my-new-list",
            html: items.join("")
        }).appendTo("#ImageList");
    });
}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getVideos() {

    //Replace the current HTML in that div with a loading message
    $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

    $.getJSON(RAMA, function (data) {

        //Create an array to hold all the retrieved assets
        var items = [];

        //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
        $.each(data, function (key, val) {
            items.push(idtest = (val["id"]));
            items.push("<hr  />");
            items.push("<video width='400' height='400' controls> <source src= " + BLOB_ACCOUNT + val["filePath"] + " type='video/mp4'> <source src =" + BLOB_ACCOUNT + val["filePath"] + " type='video/ogg'> </video> <br />");
            items.push("File : " + val["fileName"] + "<br />");
            items.push("Uploaded by: " + val["userName"] + " (user id: " + val["userID"] + ")<br/>");
            items.push('File ID = '+ idtest + ' <br/>');
            items.push('<button type="button" id="delMedia" class="btn btn-danger" onclick="deleteAsset(idtest)" >Delete</button><br/><br/>');
            items.push("<hr  />");

        });

        //Clear the assetlist div 
        $('#ImageList').empty();

        //Append the contents of the items array to the ImageList Div
        $("<ul/>", {
            "class": "my-new-list",
            html: items.join("")
        }).appendTo("#ImageList");
    });
}

//A function to delete an asset with a specific ID.
//The id paramater is provided to the function as defined in the relevant onclick handler
function deleteAsset(id) {
    $.ajax({
        //Note the need to concatenate the 
        url: DMA0 + id + DMA1,
        type: "GET",

    }).done(function (msg) {
        //On success, update the image list.
        location.reload();
    });
}

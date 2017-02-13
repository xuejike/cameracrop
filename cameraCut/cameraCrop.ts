/**
 * Created by xuejike on 2017/2/13.
 */
declare var $,Webcam;
 class cameraCrop{
    private width;
    private height;

    private cameraId;
    private cameraIdSelector;
    private cropId;
    private cropIdSelector;

    private imgCropIdSelector;
    private imgCropId;
    private imgData;



    constructor(selector,width,height){

       var cpId="#"+selector;
       this.cameraId='camera_'+new Date().getTime();
       this.cameraIdSelector="#"+this.cameraId;

       this.cropId='crop_'+new Date().getTime();
        this.cropIdSelector="#"+this.cropId;
        // $(cpId).empty();
        $(cpId).html('<div id="'+this.cameraId+'" style="position: absolute;' +
            'width: '+width+'px;height: '+height+'px;"></div>'+
            '<div id="'+this.cropId+'" style="position: absolute;' +
            'width: '+width+'px;height: '+height+'px;display: none"></div>');

        Webcam.set({
            // live preview size
            width: width,
            height: height,

            // device capture size
            dest_width: width,
            dest_height: height,

            // final cropped size
            crop_width: width,
            crop_height: height,

            // format and quality
            image_format: 'jpeg',
            jpeg_quality: 90
        });
    }
    public start(){
        Webcam.attach( this.cameraIdSelector );
    }
    public switchToCamera(){
        $(this.cameraIdSelector).show();
        $(this.cropIdSelector).hide();
    }
    public take(cropRatio){
        var that=this;
        Webcam.snap( function(data_uri) {
//            $("#my_camera").hide();
            $(that.cameraIdSelector).hide();
//            Webcam.off();off
            // display results in page
            $(that.cropIdSelector).show();
            that.imgCropId="cropImg_"+new Date().getTime();
            that.imgCropIdSelector="#"+that.imgCropId;
            that.imgData=data_uri;
            $(that.cropIdSelector).html('<img id="'+that.imgCropId+'" src="'+data_uri+'"/>')
            // document.getElementById('results').innerHTML =
            //     '<img id="snapImg" src="'+data_uri+'"/>';
            if(cropRatio){
                setTimeout(function () {
                    that.crop(cropRatio);
                },200)
            }
        } );
    }
    public crop(cropRatio){
        // $(this.imgCropIdSelector).Jcrop({
        //
        //     bgColor:     'black',
        //     bgOpacity:   .4,
        //     // setSelect:   [ 100, 100, 50, 50 ],
        //     aspectRatio: cropRatio
        // });
        $(this.imgCropIdSelector).cropper({
            aspectRatio: cropRatio
        });
    }
    public getImgData(){
        var c=$(this.imgCropIdSelector).cropper('getCroppedCanvas');
        return c.toDataURL();
    }
}
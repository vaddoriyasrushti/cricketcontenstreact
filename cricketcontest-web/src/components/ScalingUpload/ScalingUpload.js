import React, { Component } from 'react';

class ScalingUpload extends Component {

    state = {
        dataUrl: ""
    }

    resize(file, maxWidth, maxHeight, fn) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (event) {
            var dataUrl = event.target.result;

            var image = new Image();
            image.src = dataUrl;
            image.onload = function () {
               
                var resizedDataUrl = this.resizeImage(image, maxWidth, maxHeight, 0.7);
                fn(resizedDataUrl);
            };
        };
    }

    resizeImage(image, maxWidth, maxHeight, quality) {
    
        var canvas = document.createElement('canvas');

        var width = image.width;
        var height = image.height;

        if (width > height) {
            if (width > maxWidth) {
                height = Math.round(height * maxWidth / width);
                width = maxWidth;
            }
        } else {
            if (height > maxHeight) {
                width = Math.round(width * maxHeight / height);
                height = maxHeight;
            }
        }

        canvas.width = width;
        canvas.height = height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, width, height);
        return canvas.toDataURL("image/jpeg", quality);
    }

    _onChange(e) {
        
        var files = e.target.files;
        var maxWidth = this.props.maxWidth;
        var maxHeight = this.props.maxHeight;
        this.resize(files[0], maxWidth, maxHeight, function (resizedDataUrl) {
            this.setState({ dataUrl: resizedDataUrl });
        });
    }


    render() {
       
        var image;
        var dataUrl = this.state.dataUrl;
        if (dataUrl) {
            image = <img alt="" src={dataUrl} />
        }
        return (
            <div>
                <input ref="upload" type="file" accept="image/*" onChange={this._onChange.bind(this)} />
                {image}
            </div>
        )
    }
}

export default ScalingUpload;
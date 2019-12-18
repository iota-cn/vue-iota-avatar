<script>
export default {
    name: 'IotaAvatarEditor',
    props: {
        title: {
            type: String
        },
        previewHint: {
            type: String
        },
        selectImgHint: {
            type: String
        },
        cropHint: {
            type: String
        },
        radiusPerc: Number,
        width: Number,
        height: Number,
        avatarFile: {
            type: [Object, String, File]
        }
    },

    created() {
        this.move = false;
        this.resize = false;
        //props
        this.scaleBase = 100;
        this.calcWidth = this.width > 0 ? this.width : this.scaleBase;
        this.calcHeight = this.height > 0 ? this.height : this.scaleBase;
        this.aspectRatio = this.calcWidth / this.calcHeight;
        this.widthBase = this.aspectRatio > 1 ? this.scaleBase : this.scaleBase * this.aspectRatio;
        this.heightBase = this.widthBase / this.aspectRatio;
        this.caclRadiusPerc = this.radiusPerc ? this.radiusPerc : 0;

        if (typeof (this.calcRadiusPerc) !== 'number') {
            this.calcRadiusPerc = 0;
        }
        if (this.calcRadiusPerc > 100 || this.calcRadiusPerc < 0) {
            this.calcRadiusPerc = 0;
        }
        this.radius = Math.min(this.widthBase, this.heightBase) * this.calcRadiusPerc / 100 / 2;
        //or state?
        this.widthOfRawCanvas = undefined;
        this.heightOfRawCanvas = undefined;
        this.widthOfCropCanvas = undefined;
        this.heightOfCropCanvas = undefined;
        this.domWidthOfRawCanvas = 320;
        this.domHeightOfRawCanvas = undefined;
        this.domWidthOfCropCanvas = undefined;
        this.domHeightOfCropCanvas = undefined;
        //init position
        this.topOfRawCanvas = undefined;
        this.leftOfRawCanvas = undefined;
        this.topOfCropCanvas = undefined;
        this.leftOfCropCanvas = undefined;
        this.topOfResizeCanvas = undefined;
        this.leftOfResizeCanvas = undefined;
        this.img = undefined;
    },

    mounted() {
        document.addEventListener('mousedown', this.onMoveDown);
        document.addEventListener('mousedown', this.onResizeDown);
        this.oldAvatarFile = this.avatarFile;
        this.redraw(this.avatarFile);
    },

    updated() {
        if (this.oldAvatarFile !== this.avatarFile) {
            this.oldAvatarFile = this.avatarFile;
            this.redraw(this.avatarFile);
        }
    },

    methods: {
        onResizeMove(event) {
            let currentX = event.clientX;
            let currentY = event.clientY;
            let deltaX = currentX - this.beginX;
            let deltaY = currentY - this.beginY;
            if (this.aspectRatio > 1) {
                deltaY = deltaX / this.aspectRatio;
            } else {
                deltaX = deltaY * this.aspectRatio;
            }
            let domWidth = this.lastDomWidth + deltaX;
            let domHeight = this.lastDomHeight + deltaY;
            this.domWidthOfCropCanvas = domWidth;
            this.domHeightOfCropCanvas = domHeight;
            if (domWidth < 10) {
                this.domWidthOfCropCanvas = 10;
            }
            if (domHeight < 10) {
                this.domHeightOfCropCanvas = 10;
            }
            let outOfX = domWidth + this.leftOfCropCanvas - (this.leftOfRawCanvas + this.domWidthOfRawCanvas);
            let outOfY = domHeight + this.topOfCropCanvas - (this.topOfRawCanvas + this.domHeightOfRawCanvas);
            if (outOfX > 0 || outOfY > 0) {
                this.domWidthOfCropCanvas = this.leftOfRawCanvas + this.domWidthOfRawCanvas - this.leftOfCropCanvas;
                this.domHeightOfCropCanvas = this.domWidthOfCropCanvas / this.aspectRatio;
                //仍然超出
                if (this.domHeightOfCropCanvas + this.topOfCropCanvas > (this.topOfRawCanvas + this.domHeightOfRawCanvas)) {
                    this.domHeightOfCropCanvas = this.topOfRawCanvas + this.domHeightOfRawCanvas - this.topOfCropCanvas;
                    this.domWidthOfCropCanvas = this.domHeightOfCropCanvas * this.aspectRatio;
                }
            }
            this.widthOfCropCanvas = this.lastWidth * this.domWidthOfCropCanvas / this.lastDomWidth;
            this.heightOfCropCanvas = this.lastHeight * this.domHeightOfCropCanvas / this.lastDomHeight;
            this.draw();
        },

        onResizeDown(event) {
            if (event.target != this.$refs._resizeCanvas)
                return;
            this.beginX = event.clientX;
            this.beginY = event.clientY;
            this.lastDomWidth = this.domWidthOfCropCanvas;
            this.lastDomHeight = this.domHeightOfCropCanvas;
            this.lastWidth = this.widthOfCropCanvas;
            this.lastHeight = this.heightOfCropCanvas;
            //设置捕获范围
            document.addEventListener("mousemove", this.onResizeMove);
            document.addEventListener("mouseup", this.onResizeUp);
        },

        onResizeUp() {
            document.removeEventListener("mousemove", this.onResizeMove);
            document.removeEventListener("mouseup", this.onResizeUp);
        },

        onMoveMove(event) {
            let currentX = event.clientX;
            let currentY = event.clientY;
            let deltaX = currentX - this.beginX;
            let deltaY = currentY - this.beginY;
            let top = this.lastTop + deltaY;
            this.topOfCropCanvas = top;
            if (top < this.topOfRawCanvas) {
                this.topOfCropCanvas = this.topOfRawCanvas;
            }
            if (top + this.domHeightOfCropCanvas > this.topOfRawCanvas + this.domHeightOfRawCanvas) {
                this.topOfCropCanvas = this.domHeightOfRawCanvas + this.topOfRawCanvas - this.domHeightOfCropCanvas;
            }
            let left = this.lastLeft + deltaX;
            this.leftOfCropCanvas = left;
            if (left < this.leftOfRawCanvas) {
                this.leftOfCropCanvas = this.leftOfRawCanvas;
            }
            if (left + this.domWidthOfCropCanvas > this.leftOfRawCanvas + this.domWidthOfRawCanvas) {
                this.leftOfCropCanvas = this.domWidthOfRawCanvas + this.leftOfRawCanvas - this.domWidthOfCropCanvas;
            }
            this.draw();
        },

        onMoveUp() {
            document.removeEventListener("mousemove", this.onMoveMove);
            document.removeEventListener("mouseup", this.onMoveUp);
        },

        onMoveDown(event) {
            if (event.target != this.$refs._cropCanvas)
                return;
            this.beginX = event.clientX;
            this.beginY = event.clientY;
            this.lastTop = this.topOfCropCanvas;
            this.lastLeft = this.leftOfCropCanvas;
            //设置捕获范围
            document.addEventListener("mousemove", this.onMoveMove);
            document.addEventListener("mouseup", this.onMoveUp);
        },

        reDrawByImg() {
            let img = this.img;
            this.widthOfRawCanvas = img.width;
            this.heightOfRawCanvas = img.height;
            //换算dom的尺寸
            //image canvas
            if (this.widthOfRawCanvas > this.heightOfRawCanvas) {
                this.domWidthOfRawCanvas = 320;
                this.domHeightOfRawCanvas = 320 * this.heightOfRawCanvas / this.widthOfRawCanvas;
                this.leftOfRawCanvas = 0;
                this.topOfRawCanvas = (320 - this.domHeightOfRawCanvas) / 2;
            } else {
                this.domHeightOfRawCanvas = 320;
                this.domWidthOfRawCanvas = 320 * this.widthOfRawCanvas / this.heightOfRawCanvas;
                this.topOfRawCanvas = 0;
                this.leftOfRawCanvas = (320 - this.domWidthOfRawCanvas) / 2;
            }
            //crop canvas
            let widthV = Math.min(this.domWidthOfRawCanvas, this.domHeightOfRawCanvas);
            let base = widthV;
            if (widthV > 200) {
                widthV = 200;
            }
            if (widthV > 100 && widthV < 200) {
                widthV = widthV - 20;
            }
            if (this.aspectRatio > 1) {
                this.domWidthOfCropCanvas = widthV;
                this.domHeightOfCropCanvas = widthV / this.aspectRatio;
            } else {
                this.domHeightOfCropCanvas = widthV;
                this.domWidthOfCropCanvas = widthV * this.aspectRatio;
            }
            this.widthOfCropCanvas = Math.min(this.widthOfRawCanvas, this.heightOfRawCanvas) * this.domWidthOfCropCanvas / base;
            this.heightOfCropCanvas = this.widthOfCropCanvas / this.aspectRatio;
            this.leftOfCropCanvas = (320 - this.domWidthOfCropCanvas) / 2;
            this.topOfCropCanvas = (320 - this.domHeightOfCropCanvas) / 2;
            this.draw();
        },

        roundRect(ctx, x, y, width, height, radius, fill, stroke) {
            if (typeof stroke == 'undefined') {
                stroke = true;
            }
            if (typeof radius === 'undefined') {
                radius = 5;
            }
            if (typeof radius === 'number') {
                radius = { tl: radius, tr: radius, br: radius, bl: radius };
            } else {
                var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
                for (var side in defaultRadius) {
                    radius[side] = radius[side] || defaultRadius[side];
                }
            }
            ctx.beginPath();
            ctx.moveTo(x + radius.tl, y);
            ctx.lineTo(x + width - radius.tr, y);
            ctx.arc(x + width - radius.tr, y + radius.tr, radius.tr, Math.PI * 1.5, Math.PI * 2);
            ctx.lineTo(x + width, y + height - radius.br);
            ctx.arc(x + width - radius.br, y + height - radius.br, radius.br, 0, Math.PI * 0.5);
            ctx.lineTo(x + radius.bl, y + height);
            ctx.arc(x + radius.bl, y + height - radius.bl, radius.bl, Math.PI * 0.5, Math.PI);
            ctx.lineTo(x, y + radius.tl);
            ctx.arc(x + radius.tl, y + radius.tl, radius.tl, Math.PI, Math.PI * 1.5);
            ctx.closePath();
            if (fill) {
                ctx.fill();
            }
            if (stroke) {
                ctx.stroke();
            }

        },

        draw() {
            //update dom properties
            let cropX = (this.leftOfCropCanvas - this.leftOfRawCanvas) * this.widthOfRawCanvas / this.domWidthOfRawCanvas;
            let cropY = (this.topOfCropCanvas - this.topOfRawCanvas) * this.heightOfRawCanvas / this.domHeightOfRawCanvas;
            //resize
            this.topOfResizeCanvas = this.topOfCropCanvas + this.domHeightOfCropCanvas - 5;
            this.leftOfResizeCanvas = this.leftOfCropCanvas + this.domWidthOfCropCanvas - 5;
            // raw
            this.$refs._rawCanvas.width = this.widthOfRawCanvas;
            this.$refs._rawCanvas.height = this.heightOfRawCanvas;
            this.$refs._rawCanvas.style.width = this.domWidthOfRawCanvas + 'px';
            this.$refs._rawCanvas.style.height = this.domHeightOfRawCanvas + 'px';
            this.$refs._rawCanvas.style.top = this.topOfRawCanvas + 'px';
            this.$refs._rawCanvas.style.left = this.leftOfRawCanvas + 'px';
            // crop
            this.$refs._cropCanvas.width = this.widthOfCropCanvas;
            this.$refs._cropCanvas.height = this.heightOfCropCanvas;
            this.$refs._cropCanvas.style.width = this.domWidthOfCropCanvas + 'px';
            this.$refs._cropCanvas.style.height = this.domHeightOfCropCanvas + 'px';
            this.$refs._cropCanvas.style.top = this.topOfCropCanvas + 'px';
            this.$refs._cropCanvas.style.left = this.leftOfCropCanvas + 'px';
            //resize
            this.$refs._resizeCanvas.style.top = this.topOfResizeCanvas + 'px';
            this.$refs._resizeCanvas.style.left = this.leftOfResizeCanvas + 'px';
            //draw
            let img = this.img;
            let ctx = this.$refs._rawCanvas.getContext('2d');
            ctx.clearRect(0, 0, this.widthOfRawCanvas, this.heightOfRawCanvas);
            ctx.globalAlpha = 0.6;
            ctx.fillRect(0, 0, this.widthOfRawCanvas, this.heightOfRawCanvas);
            ctx.globalAlpha = 1;
            ctx.globalCompositeOperation = "destination-out";
            this.roundRect(ctx, cropX, cropY, this.widthOfCropCanvas, this.heightOfCropCanvas,
                Math.min(this.widthOfCropCanvas, this.heightOfCropCanvas) * this.calcRadiusPerc / 100 / 2);
            ctx.fill();

            let cropCtx = this.$refs._cropCanvas.getContext('2d');
            cropCtx.clearRect(0, 0, this.widthOfCropCanvas, this.heightOfCropCanvas);
            cropCtx.globalAlpha = 1;
            cropCtx.strokeStyle = "white";
            for (let i = 0; i < Math.max(1, this.widthOfCropCanvas * 0.005); i++) {
                cropCtx.strokeRect(i, i, this.widthOfCropCanvas - i * 2, this.heightOfCropCanvas - i * 2);
            }

            ctx.globalAlpha = 1;
            ctx.globalCompositeOperation = "destination-over";
            ctx.drawImage(img, 0, 0);
            ctx.globalAlpha = 1;
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, this.widthOfRawCanvas, this.heightOfRawCanvas);
            //let croppedImg = ctx.getImageData(posX, posY, this.widthOfCropCanvas, this.heightOfCropCanvas);
            //refresh view
            this.refreshPreView(img, cropX, cropY, this.$refs._v100Canvas.getContext('2d'), this.widthOfCropCanvas, this.heightOfCropCanvas, this.calcWidth, this.calcHeight);
            this.refreshPreView(img, cropX, cropY, this.$refs._v64Canvas.getContext('2d'), this.widthOfCropCanvas, this.heightOfCropCanvas, this.calcWidth * 0.64, this.calcHeight * 0.64);
            this.refreshPreView(img, cropX, cropY, this.$refs._v32Canvas.getContext('2d'), this.widthOfCropCanvas, this.heightOfCropCanvas, this.calcWidth * 0.32, this.calcHeight * 0.32);
            //this.onAvatarData(ctx.getImageData(cropX, cropY, this.widthOfCropCanvas, this.heightOfCropCanvas));
            this.$emit('avatar', this.$refs._v100Canvas);
        },

        refreshPreView(img, cropX, cropY, canvasCtx, sX, sY, dX, dY) {
            canvasCtx.clearRect(0, 0, dX, dY);
            canvasCtx.fillStyle = 'white';
            canvasCtx.fillRect(0, 0, dX, dY);
            canvasCtx.drawImage(img, cropX, cropY, sX, sY, 0, 0, dX, dY);
        },

        redraw(file) {
            if (file) {
                let resizeCtx = this.$refs._resizeCanvas.getContext('2d');
                resizeCtx.globalAlpha = 1;
                resizeCtx.strokeStyle = "white";
                for (let i = 0; i < 3; i++) {
                    resizeCtx.strokeRect(i, i, 10 - i * 2, 10 - i * 2);
                }
                let that = this;
                var img = new Image;
                img.onload = function () {
                    that.img = img;
                    that.reDrawByImg();
                };
                if (typeof file === 'object') {
                    img.src = URL.createObjectURL(file);
                } else {
                    img.src = file;
                }
            }
        },

        onSelectImg() {
            this.$refs._fileInput.click();
            let that = this;
            this.$refs._fileInput.type = "file";
            this.$refs._fileInput.addEventListener('change', function () {
                let files = that.$refs._fileInput.files;
                that.redraw(files[0]);
            });
        }
    },

    render() {
        return (
            <div class='iota-avatar-modal-body'>
                <div class={'source-wrapper'}>
                    <div class={'cropper-wrapper'}>
                        <div class={'image-ropper-wrapper'}>
                            <div
                                class={'avatar-editor'}
                            >
                                <canvas ref={'_rawCanvas'}
                                    style={{ cursor: 'default', position: 'absolute' }} />
                                <canvas ref={'_cropCanvas'}
                                    style={{ cursor: 'move', position: 'absolute' }}
                                />
                                <canvas ref={'_resizeCanvas'} height="10" width="10"
                                    style={{ cursor: 'se-resize', position: 'absolute' }}
                                />
                            </div>
                        </div>
                    </div>
                    <p class={'crop-hint'}>
                        <input ref={'_fileInput'}
                            type="file"
                            accept="image/*"
                            class={'image-cropper-input'}
                            style={{ display: 'none' }} />
                        <label>
                            <button class='iota-avatar-button iota-avatar-button-dashed' onClick={this.onSelectImg}>
                                {this.selectImgHint ? this.selectImgHint : 'Select Image'}
                            </button>
                        </label>
                        <span
                            class={'tip'}
                        >
                            {this.cropHint ?
                                this.cropHint :
                                `Best size: ${this.calcWidth}×${this.calcWidth}, you can cut it.`}
                        </span>
                    </p>
                </div>
                <div class={'preview-wrapper'}>
                    <div class={'preview'}>
                        <p class={'title'}>{this.previewHint ? this.previewHint : 'Preview'}</p>
                        <canvas ref={'_v100Canvas'}
                            width={this.calcWidth}
                            height={this.calcHeight}
                            style={{
                                width: `${this.widthBase * 1.5}px`,
                                height: `${this.heightBase * 1.5}px`,
                                borderRadius: this.radius
                            }}
                        />
                        <div class={'prev-hint'}>
                            {this.aspectRatio > 1 ? `100x${Math.round(100 / this.aspectRatio)}` : `${Math.round(100 * this.aspectRatio)}×100`}</div>
                        <canvas ref={'_v64Canvas'}
                            width={this.calcWidth * 0.64}
                            height={this.calcHeight * 0.64}
                            style={{
                                width: `${this.widthBase * 0.64 * 1.5}px`,
                                height: `${this.heightBase * 0.64 * 1.5}px`,
                                borderRadius: this.radius * 0.64
                            }} />
                        <div class={'prev-hint'}>
                            {this.aspectRatio > 1 ? `64x${Math.round(64 / this.aspectRatio)}` : `${Math.round(64 * this.aspectRatio)}×64`}</div>
                        <canvas ref={'_v32Canvas'}
                            width={this.calcWidth * 0.32}
                            height={this.calcHeight * 0.32}
                            style={{
                                width: `${this.widthBase * 0.32 * 1.5}px`,
                                height: `${this.heightBase * 0.32 * 1.5}px`,
                                borderRadius: this.radius * 0.32
                            }}
                        />
                        <div class={'prev-hint'}>
                            {this.aspectRatio > 1 ? `32x${Math.round(32 / this.aspectRatio)}` : `${Math.round(32 * this.aspectRatio)}×32`}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

</script>

<style lang="stylus" >
@import '../styles/common';

.iota-avatar-modal-body {
    padding: 0;
    // font-size: 0;
    overflow: hidden;
    user-select: none;

    .source-wrapper {
        display: inline-block;
        width: 322px;
    }

    .cropper-wrapper {
        position: relative;
        width: 322px;
        height: 322px;
        background: #000;
        border: 1px solid #e0e0e0;

        .image-cropper-wrapper {
            width: 322px;
            height: 322px;
            margin: auto 0;

            .avatarEditor {
                position: relative;
                top: 0;
                left: 0;
                overflow: hidden;
                width: 320px;
                height: 320px;
            }
        }
    }

    .crop-hint {
        margin: 0;
        padding: 20px 0 0;
        font-size: 14px;
        color: gray;

        .tip {
            display: block;
            margin-top: 5px;
        }
    }

    .preview-wrapper {
        display: inline-block;
        width: 220px;
        float: right;

        .preview {
            text-align: center;

            .title {
                font-size: 18px;
                padding: 0;
                margin: 0;
            }

            .prev-hint {
                padding: 0;
                font-size: 14px;
                color: gray;
            }

            canvas {
                background: #000;
                border-radius: 50%;
                box-shadow: 0 0 1px silver;
                margin: 15px 0 0;
            }
        }
    }
}
</style>
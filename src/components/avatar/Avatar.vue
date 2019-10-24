<script>
import classNames from 'classnames';
import AvatarEditor from './AvatarEditor'
import Modal from '../modal/Modal'

export default {
    name: 'Avatar',
    props: {
        title: String,
        previewHint: String,
        selectImgHint: String,
        cropHint: String,
        onAvatarData: Function,
        width: Number,
        height: Number,
        radiusPerc: Number
    },

    data() {
        return {
            visible: false,
            avatarFile: null
        }
    },

    methods: {
        setVisible(visible) {
            this.visible = visible
        },

        setAvatarFile(file) {
            this.visible = true
            this.avatarFile = file
        },

        onClick() {
            let input = document.createElement('input');
            let that = this;
            input.type = "file";
            input.addEventListener('change', function () {
                let files = input.files;
                that.setAvatarFile(files[0]);
            });
            input.click();
        },

        onOk() {
            this.setVisible(false);
            if (this.onAvatarData) {
                this.onAvatarData(this.avatarCanvas);
            }
        },

        onCancel() {
            this.setVisible(false);
        },

        onAvatarDataOfEditor(canvas) {
            this.avatarCanvas = canvas;
            if (!this.avatarCanvas.toBlob) {
                this.avatarCanvas.toBlob = function (callback, type, quality) {
                    var binStr = atob(this.toDataURL(type, quality).split(',')[1]),
                        len = binStr.length,
                        arr = new Uint8Array(len);

                    for (var i = 0; i < len; i++) {
                        arr[i] = binStr.charCodeAt(i);
                    }

                    callback(new Blob([arr], { type: type || 'image/png' }));
                }
            }
        }
    },

    render() {
        return (
            <div class={classNames('avatar', this.className)} >
                <slot name='controller'>
                    <button class="iota-avatar-button iota-avatar-button-dashed" onClick={this.onClick}>{this.title ? this.title : 'Select Image'}</button>
                </slot>
                {this.visible ? <Modal onCancel={this.onCancel} onOk={this.onOk}>
                    <div slot="header" class='title'>{this.title ? this.title : 'Upload Image'}</div>
                    <AvatarEditor title={this.title}
                        slot="body"
                        previewHint={this.previewHint}
                        width={this.width}
                        height={this.height}
                        radiusPerc={this.radiusPerc}
                        selectImgHint={this.selectImgHint}
                        cropHint={this.cropHint}
                        onAvatarData={this.onAvatarDataOfEditor}
                        avatarFile={this.avatarFile} />
                </Modal> : null
                }
            </div >
        );
    }
}
</script>

<style lang="stylus" scoped>
@import '../styles/common';

.title {
    text-align: center;
    letter-spacing: 1px;
    color: rgba(51, 51, 51, 0.8);
    font-size: 16px;
}
</style>
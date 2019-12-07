<script>
import AvatarEditor from './AvatarEditor'
import Modal from '../modal/Modal'

export default {
    name: 'IotaAvatar',
    props: {
        title: String,
        previewHint: String,
        selectImgHint: String,
        cropHint: String,
        width: Number,
        height: Number,
        radiusPerc: Number,
        okText: String,
        cancelText: String
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

        onClick(e) {
            e.stopPropagation()
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
            this.$emit('avatar', this.avatarCanvas);
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

    render(h) {
        return (
            <div class='avatar'>
                <div class='controller' onClick={this.onClick}>
                    {
                        this.$slots.controller
                            ? h('i', this.$slots.controller)
                            : <button class="iota-avatar-button iota-avatar-button-dashed">{this.title ? this.title : 'Select Image'}</button>
                    }
                </div>
                {this.visible ? <Modal onCancel={this.onCancel} onOk={this.onOk} okText={this.okText} cancelText={this.cancelText}>
                    <div class='iota-avatar-modal-title' slot='header'>{this.title ? this.title : 'Upload Image'}</div>
                    <AvatarEditor title={this.title}
                        slot="body"
                        previewHint={this.previewHint}
                        width={this.width}
                        height={this.height}
                        radiusPerc={this.radiusPerc}
                        selectImgHint={this.selectImgHint}
                        cropHint={this.cropHint}
                        onAvatar={this.onAvatarDataOfEditor}
                        avatarFile={this.avatarFile} />
                </Modal> : null
                }
            </div >
        );
    }
}
</script>

<style lang="stylus">
@import '../styles/common';

.iota-avatar {
    .controller {
        cursor: pointer;
    }
}

.iota-avatar-modal-title {
    width: 100%;
    letter-spacing: 1px;
    color: rgba(51, 51, 51, 0.8);
    font-size: 16px;
}
</style>
<script>
import AvatarViewer from './AvatarViewer.vue'

export default {
    name: 'IotaRawAvatar',
    props: {
        uploadImg: Function,
        width: Number,
        height: Number,
        img: String,
        tips: Array,
        disabled: Boolean
    },

    methods: {
        onClick() {
            let input = document.createElement('input');
            let that = this;
            input.type = "file";
            if (!this.disabled) {
                input.addEventListener('change', function () {
                    let files = input.files;
                    if (that.uploadImg) {
                        that.uploadImg(files[0]);
                    }
                });
                input.click();
            }
        }
    },

    render() {
        return (
            <div onClick={this.onClick} >
                <AvatarViewer
                    img={this.img}
                    height={this.height}
                    width={this.width}
                    color='#666666'
                />
                {this.tips ?
                    <ol style={{ textAlign: "left" }}>
                        {this.tips.map((v, i) => {
                            return (
                                <li key={i}>{v}</li>
                            )
                        })}
                    </ol> : <div></div>
                }
            </div>
        );
    }
}
</script>
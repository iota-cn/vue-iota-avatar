<script>
import classNames from 'classnames'
import defaultUploadImg from './assets/icon-upload.svg'
//RGB ONLY
const colorRegex = new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)

export default {
    name: 'AvatarViewer',
    props: {
        showUpload: Boolean,
        nickname: {
            type: String
        },
        img: String,
        width: {
            type: Number,
            default: 100
        },
        height: {
            type: Number,
            default: 100
        },
        radius: {
            type: Number,
            default: 4
        },
        color: {
            type: String,
            default: 'gray'
        },
        userStyle: {
            type: Object,
            default() {
                return undefined
            }
        },
        className: String
    },

    render() {
        let { userStyle: style, showUpload, nickname, img, width, height, radius, color, className } = this
        if (style === undefined) {
            style = {}
            if (color && colorRegex.test(color)) {
                style.backgroundColor = color
            } else {
                style.backgroundColor = this.color
            }
            let halfSize = Math.min(width, height) * 0.618
            style.borderRadius = radius >= 0 ?
                (radius > halfSize ? halfSize : radius) : halfSize
            style.borderRadius = `${style.borderRadius}px`
            style.fontSize = `${halfSize}px`
            style.width = `${width}px`
            style.height = `${height}px`
            style.lineHeight = `${height}px`
            style.display = 'block'
        }
        let uploadStyle = Object.assign({}, style)
        uploadStyle.position = 'absolute'
        delete uploadStyle.backgroundColor
        uploadStyle.left = '0'
        uploadStyle.top = '0'
        showUpload = showUpload === undefined ? (!img && !nickname) : showUpload
        let upload = (<img class='upload' src={defaultUploadImg}
            style={uploadStyle} />)
        return (
            <div class={classNames('avatarViewer', className)}>
                {img ?
                    <img
                        alt={nickname}
                        src={img}
                        style={style}
                    />
                    :
                    <div
                        style={style}
                    >
                        {nickname ? nickname[0] : (showUpload ? null : '')}
                    </div>
                }
                {
                    showUpload ? upload
                        : null
                }
            </div>
        )
    }
}
</script>

<style lang="stylus" scoped>
.avatarViewer {
    text-align: center;
    cursor: pointer;
    color: white;
    position: relative;

    .upload {
        background-color: rgba(128, 128, 128, 0.4);
        color: rgba(255, 255, 255, 0.3);
        transition: background-color 0.3s ease, color 0.3s ease;

        :hover {
            background-color: rgba(128, 128, 128, 0.6);
            color: rgba(255, 255, 255, 1);
        }
    }

    img {
        border-radius: $radius;
    }
}
</style>
<script>
//RGB ONLY
const colorRegex = new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)

const defaultUpload = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiPjxwYXRoIGQ9Ik00MzMgNjAxYy0xMCAwLTIwLTQtMjctMTJhMzggMzggMCAwMTAtNTNsMTA2LTEwM2MxNC0xNCAzOC0xNCA1MiAwbDEwNCAxMDJhMzggMzggMCAwMS01MyA1M2wtNzctNzUtNzkgNzdjLTcgNy0xNyAxMS0yNiAxMXoiLz48cGF0aCBkPSJNNTM3IDkwOWMtMjEgMC0zOC0xNi0zOC0zN1Y0ODJhMzggMzggMCAwMTc2IDB2MzkwYzAgMjEtMTcgMzctMzggMzd6Ii8+PGc+PHBhdGggZD0iTTc4MyA3MjdhMzggMzggMCAwMTAtNzZjNTcgMCAxMDQtNDMgMTA0LTk3di0yN2MwLTQ0LTMyLTgyLTc3LTk0bC0yOS03IDEtMzZjMi00NS0xOC05My01NC0xMzEtNDItNDQtMTAwLTY5LTE1OS02OS0xMTggMC0yMTMgOTAtMjEzIDIwMnYzN0gyNDFjLTU3IDAtMTA0IDQ0LTEwNCA5OHYyN2MwIDU0IDQ3IDk3IDEwNCA5N2EzOCAzOCAwIDAxMCA3NmMtOTkgMC0xNzktNzgtMTc5LTE3M3YtMjdjMC05NiA4MC0xNzMgMTc5LTE3M2g0MmEyODUgMjg1IDAgMDEyODYtMjM5Yzc5IDAgMTU3IDMzIDIxNCA5MiA0NCA0NyA3MCAxMDUgNzQgMTYzIDYzIDI3IDEwNSA4OCAxMDUgMTU3djI3YzAgOTUtODAgMTczLTE3OSAxNzN6Ii8+PC9nPjwvc3ZnPg=="

export default {
    name: 'IotaAvatarViewer',
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
        }
    },

    render() {
        let { userStyle: style, showUpload, nickname, img, width, height, radius, color } = this
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
        let imageStyle = {
            margin: 'auto',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            maxHeight: '100%',
            maxWidth: '100%'
        }
        let uploadStyle = Object.assign({}, style)
        uploadStyle.position = 'absolute'
        delete uploadStyle.backgroundColor
        uploadStyle.left = '0'
        uploadStyle.top = '0'
        showUpload = showUpload === undefined ? (!img && !nickname) : showUpload
        let upload = (<img class='upload' src={defaultUpload}
            style={uploadStyle} />)
        return (
            <div class='iota-avatar-viewer' style={style}>
                {img ?
                    <img
                        alt={nickname}
                        src={img}
                        style={imageStyle}
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

<style lang="stylus">
.iota-avatar-viewer {
    text-align: center;
    cursor: pointer;
    color: white;
    position: relative;

    .upload {
        background-color: rgba(128, 128, 128, 0.4);
        color: rgba(255, 255, 255, 0.3);
        transition: background-color 0.3s ease, color 0.3s ease;
        filter: opacity(0.1);

        &:hover {
            background-color: rgba(128, 128, 128, 0.6);
            color: rgba(255, 255, 255, 1);
            filter: opacity(0.3);
            transition: filter 0.3s ease, color 0.3s ease;
        }
    }

    img {
        // border-radius: $radius;
    }
}
</style>
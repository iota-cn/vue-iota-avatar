<template>
    <div id="examples">
        <div class='section'>
            <h3>Install</h3>
            <code>
            </code>
        </div>
        <div class='section'>
            <h3>AvatarViewer</h3>
            <code>
            </code>
            <h4>Example</h4>
            <div class='example'>
                <iota-avatar-viewer showUpload
                    nickname="Hi"
                    :img="vueImg"
                    :radius='51' />
            </div>
        </div>
        <div class='section'>
            <h3>RawAvatar</h3>
            <code>
            </code>
            <h4>Example</h4>
            <div class='example'>
                <iota-rawavatar :img='vueImg'
                    :tips='tips' />
            </div>
        </div>
        <div class='section'>
            <h3>AvatarEditor</h3>
            <code>
            </code>
            <h4>Example</h4>
            <div class='example'>
                <div class="example-avatar-editor">
                    <iota-avatar-editor :avatarFile='vueImg'
                        :width="100"
                        :height="100" />
                </div>
            </div>
        </div>
        <div class='section'>
            <h3>AvatarEditor with default Modal</h3>
            <code>
            </code>
            <h4>Example</h4>
            <div class='example'>
                <iota-avatar />
            </div>
        </div>
        <div class='section'>
            <h3>AvatarEditor with custom contorller</h3>
            <code>
            </code>
            <h4>Example</h4>
            <div class='example'>
                <iota-avatar okText='O'
                    cancelText="C">
                    <a slot="controller"
                        class="controller">Controller Slot</a>
                </iota-avatar>
            </div>
        </div>
    </div>
</template>

<script>
import VueLogo from './assets/vue-js.png'
import AvatarViewer from '../src/components/avatar/AvatarViewer.vue'
import RawAvatar from '../src/components/avatar/RawAvatar.vue'
import AvatarEditor from '../src/components/avatar/AvatarEditor.vue'
import Avatar from '../src/components/avatar/Avatar.vue'

export default {
    name: 'examples',
    data() {
        return {
            vueImg: VueLogo,
            rawAvatarImg: undefined,
            tips: ['Click and select an image.', 'Another tips....']
        }
    },

    components: {
        'iota-avatar-viewer': AvatarViewer,
        'iota-rawavatar': RawAvatar,
        'iota-avatar-editor': AvatarEditor,
        'iota-avatar': Avatar
    }
}
</script>

<style lang="stylus" scoped>
#examples {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #2c3e50;
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 0 auto;
}

.section {
    display: flex;
    flex-direction: column;
    margin: 10px;

    .example {
        display: flex;
        flex-direction: row;
        justify-content: center;

        .example-avatar-editor {
            width: 600px;
            padding: 10px;
            border: 1px solid;
        }

        .example-rawavatar {
            // background-color: gray;
            // border: 1px solid gray;
        }
    }

    .controller {
        color: #7cecbe;
        border: 1px solid #efefef;
        padding: 10px;
    }
}
</style>

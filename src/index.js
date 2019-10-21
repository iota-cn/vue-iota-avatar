import { version } from '../package.json';

import { default as Avatar } from './components/avatar/Avatar.vue'
import { default as AvatarViewer } from './components/avatar/AvatarViewer.vue'
import { default as AvatarEditor } from './components/avatar/AvatarEditor.vue'
import { default as RawAvatar } from './components/avatar/RawAvatar.vue'

const components = [
    Avatar,
    AvatarViewer,
    AvatarEditor,
    RawAvatar
]

export {
    Avatar,
    AvatarViewer,
    AvatarEditor,
    RawAvatar
}

const install = function (Vue) {
    components.forEach(c => {
        Vue.component(c.name, c)
    })
}

export default {
    version,
    install
}
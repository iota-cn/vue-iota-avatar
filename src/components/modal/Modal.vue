<template>
    <transition name="iota-avatar-modal">
        <div class="iota-avatar-modal-mask">
            <div class="modal-container">

                <div class="modal-header">
                    <slot name="header">
                        default header
                    </slot>
                </div>

                <div class="modal-body">
                    <slot name="body">
                        default body
                    </slot>
                </div>

                <div class="modal-footer">
                    <slot name="footer">
                        <button class="iota-avatar-button iota-avatar-button-lg"
                            @click="onCancel">
                            {{cancelText||'Cancel'}}
                        </button>
                        <button class="iota-avatar-button iota-avatar-button-lg iota-avatar-button-primary"
                            @click="onOk">
                            {{okText||'OK'}}
                        </button>
                    </slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        okText: String,
        cancelText: String
    },
    methods: {
        onCancel(e) {
            e.stopPropagation()
            e.preventDefault()
            this.$emit('cancel', e)
        },
        onOk(e) {
            e.stopPropagation()
            e.preventDefault()
            this.$emit('ok', e)
        }
    }
}
</script>

<style lang="stylus">
@import '../styles/common';

.iota-avatar-modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s ease;

    .modal-container {
        display: flex;
        flex-direction: column;
        margin: 0px auto;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        transition: all 0.3s ease;
        font-family: Helvetica, Arial, sans-serif;

        .modal-header {
            padding: 13px 16px;
            border-radius: 4px 4px 0 0;
            background: #fff;
            color: rgba(0, 0, 0, 0.65);
            border-bottom: 1px solid #e9e9e9;

            .title {
                margin-top: 0;
            }
        }

        .modal-body {
            margin: 0px 0;
            padding: 16px;
        }

        .modal-footer {
            padding: 13px 16px;
            text-align: right;
            border-top: 1px solid #e9e9e9;

            button+button {
                margin-left: 8px;
                margin-bottom: 0;
            }
        }
    }
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */
.iota-avatar-modal-enter {
    opacity: 0;
}

.iota-avatar-modal-leave-active {
    opacity: 0;
}

.iota-avatar-modal-enter .iota-avatar-modal-container, .iota-avatar-modal-leave-active .iota-avatar-modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
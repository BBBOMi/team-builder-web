<template>
    <div class="session-info-wrap">
        <div class="session-info-main">
            <div class="session-info-title">
                <span>넥스터즈 {{sessionNumber}}기의<br>{{ mainTitle }}</span>
            </div>
            <SessionInfoDDay></SessionInfoDDay>

            <div class="session-info-idea-write-wrap">
                <button class="session-info-idea-write-button" @click="moveNewIdea">
                    <span class="session-info-idea-write-message">{{ ideaWriteText }}</span>
                </button>
            </div>
        </div>

        <div class="session-info-image-wrap">
            <img class="session-info-image" src="@/assets/img/session_ingo_idea_collect_image.png"/>
        </div>
    </div>
</template>

<script>
    import SessionInfoDDay from '@/components/common/sessionInfo/SessionInfoDDay';
    export default {
        name: "SessionInfoIdeaCollect",
        components: {SessionInfoDDay},
        data() {
            return {
                sessionNumber: this.$store.state.main.session.sessionNumber,
                nowPeriodType: this.$store.state.main.nowPeriod.periodType,
                ideaWriteText: this.$store.getters.isAdmin ? '공지 작성하기' : '아이디어 작성하기'
            }
        },

        computed: {
            mainTitle() {
                return '다양한 아이디어를 모집해요';
            }
        },

        methods: {
            moveNewIdea() {
                this.$router.push({path: `/session/${this.$store.state.main.session.sessionNumber}/idea/new`});
            }
        }
    }
</script>

<style scoped>
    .session-info-wrap {
        min-width: 1200px;
        margin-left: 70px;
        height: 400px;
        background-color: white;
        display: flex;
    }

    .session-info-main {
        width: 418px;
        height: 100%;
    }

    .session-info-title {
        text-align: left;
        margin: 67px 0px 16px 0px;
        width: 100%;
        height: 118px;
        font-family: NotoSansCJKkr;
        line-height: normal;
        font-size: 40px;
        font-weight: 300;
        letter-spacing: -3px;
        color: #000000;
    }

    .session-info-idea-write-wrap {
        text-align: left;
        margin-top: 39px;
    }

    .session-info-idea-write-button {
        width: 240px;
        height: 64px;
        border-style: none;
        border-radius: 6px;
        background-color: #ff5000;
    }

    .session-info-idea-write-message {
        width: 158px;
        height: 33px;
        font-family: NotoSansCJKkr;
        font-size: 22px;
        letter-spacing: -1px;
        color: #ffffff;
    }

    .session-info-image-wrap {
        width: 560px;
        height: 100%;
        margin-left: 221px;
    }

    .session-info-image {
        width: 381.4px;
        height: 306px;
        margin: 41px 60.8px 52px 117.8px;
    }

</style>

<template>
    <div class="idea-detail-header-wrap">
        <div class="idea-detail-header-main">
            <button class="favorite-button">
                <img v-show="!idea.favorite" @click="toggleFavorite" class="favorite-button-image-off" src="@/assets/img/favourites-filled-star-symbol@2x.png"/>
                <img v-show="idea.favorite" @click="toggleFavorite" class="favorite-button-image-on" src="@/assets/img/favourites-filled-star-symbol-copy@2x.png"/>
            </button>
            <span class="idea-detail-header-title">{{idea.title}}</span>
            <button v-if="availableEditIdea" @click="onClickEditIdea(idea.ideaId)" class="idea-detail-header-modify-button">
                <span class="idea-detail-header-modify-button-span">수정하기</span>
            </button>
        </div>
        <div class="idea-detail-header-sub">
            <span class="idea-detail-header-sub-text">{{positionName}}</span>
            <span class="idea-detail-header-sub-text">{{idea.author.name}}</span>
            <span class="idea-detail-header-sub-text">{{updateTime}}</span>
        </div>
    </div>
</template>

<script>
    import {ROLL_TYPE} from '@/consts/rollType';
    import moment from 'moment';

    export default {
        name: "IdeaDetailHeader",
        data() {
            return { }
        },
        props: {
            idea: {
                type: Object,
                required: true
            },
        },

        computed: {
            positionName() {
                if (this.idea.author.role === ROLL_TYPE.ADMIN) {
                    return '운영자';
                }
                return this.idea.author.position === 'DEVELOPER' ? '개발자' : '디자이너';
            },

            updateTime() {
                return moment(this.idea.updatedAt).locale('ko').format('YYYY.MM.DD  a hh:mm').toString();
            },

            availableEditIdea() {
                return this.isAdmin || this.isOwner;
            },

            isAdmin() {
                return this.$store.getters.isAdmin;
            },

            isOwner() {
                return this.$store.getters.getUuid === this.idea.author.uuid;
            }
        },

        methods: {
            toggleFavorite() {
                this.$store.dispatch('main/FAVORITE_CHANGE', {ideaId: this.idea.ideaId, isFavorite: !this.idea.favorite})
                    .catch(error => {
                        this.$notify.error({
                            title: '오류가 발생했습니다️',
                            message: error
                        });
                    });
            },

            onClickEditIdea(ideaId) {
                this.$router.push({path:`/session/${this.$store.state.main.session.sessionNumber}/idea/${this.idea.ideaId}/modify`});
            }
        },

    }
</script>

<style scoped>
    .idea-detail-header-wrap {
        margin: 75px 0px 21px 0px;
    }

    .idea-detail-header-main {
        height: 60px;
        display: flex;
    }

    .favorite-button {
        width: 28px;
        height: 26.6px;
        margin: auto 0px;
    }

    .favorite-button-image-off {
        width: 28px;
        height: 26.6px;
        object-fit: contain;
    }

    .favorite-button-image-on {
        width: 28px;
        height: 26.6px;
        object-fit: contain;
    }

    .idea-detail-header-title {
        width: 900px;
        height: 45px;
        margin: 9px 0px 10px 12px;
        font-size: 30px;
        letter-spacing: -1px;
        white-space:nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
        text-align: left;
        color: #000000;
    }

    .idea-detail-header-modify-button {
        width: 200px;
        height: 57px;
        margin-right: 0px;
        margin-left: auto;
        border-radius: 6px;
        border-style: none;
        background-color: #ff5000;
    }

    .idea-detail-header-modify-button-span {
        width: 63px;
        height: 27px;
        font-size: 18px;
        letter-spacing: -0.82px;
        color: #ffffff;
    }

    .idea-detail-header-sub {
        margin-top: 6px;
        text-align: left;
    }

    .idea-detail-header-sub-text {
        height: 21px;
        font-size: 18px;
        font-weight: 500;
        margin-right: 20px;
        letter-spacing: -0.5px;
        color: #4a4a4a;
    }
</style>
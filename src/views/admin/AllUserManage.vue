<template>
    <Layout>
        <template v-slot:body>
            <div style="width: 1200px; margin-left: 70px;">
                <div class="header">
                    <p>인증코드 설정 및 전체 회원관리 설정</p>
                </div>
                <div class="header-sub">
                    <p>회원가입 시 입력하는 인증코드를 변경할 수 있어요. 또한, 전체회원 리스트에서 현재 활동기수 회원을 추가할 수 있어요.</p>
                </div>

                <div class="certify">
                    <p>인증코드</p>
                    <div class="flex">
                        <input class="input-box" placeholder="인증코드를 입력해주세요" v-model="accessCode">
                        <button v-on:click="updateCode" class="btn-certify-apply">
                            적용하기
                        </button>
                    </div>
                </div>

                <div class="user-manage-tab d-flex">
                    <p>전체회원 {{users.length}}명</p>
                    <div class="ml-auto">
                        <button class="btn-active-user" @click="addActiveUsers">
                            활동회원추가
                        </button>
                        <button class="btn-deactive-user" @click="deleteActiveUsers">
                            활동회원제거
                        </button>
                        <button class="btn-user-remove">
                            회원제거
                        </button>
                        <input type="search"
                               class="search-box"
                               placeholder="회원명과 아이디를 검색해주세요."
                               v-on:input="search = $event.target.value"
                               @keyup="filtering()">
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <b-form-group>
                            <div class="titles">
                                <div class="flex title" style="width: 78px; padding-left: 26px; margin-bottom: -2px">
                                    <div class="custom-checkbox">
                                        <b-form-checkbox
                                                v-model="allSelected"
                                                @change="toggleAll"
                                        />
                                    </div>
                                </div>
                                <div class="flex title" style="width: 100px">
                                    가입기수
                                    <img class="pointer" :src="require('../../assets/img/group-10@2x.png')"
                                         v-on:click="sorting('id')">
                                </div>
                                <div class="title" style="width: 86px">
                                    직군
                                    <img class="pointer" :src="require('../../assets/img/group-10@2x.png')"
                                         v-on:click="sorting('position')">
                                </div>
                                <div class="title" style="width: 86px">이름</div>
                                <div class="title" style="width: 594px">아이디</div>
                                <div class="title" style="width: 135px; margin-left: 25px">
                                    활동여부
                                    <img class="pointer" :src="require('../../assets/img/group-10@2x.png')"
                                         v-on:click="sorting('isActive')">
                                </div>
                                <div class="title" style="width: 91px; margin-left: 5px">
                                    가입날짜
                                    <img class="pointer" :src="require('../../assets/img/group-10@2x.png')"
                                         v-on:click="sorting('joinDate')">
                                </div>
                            </div>

                            <table class="board">
                                <tbody>
                                <tr class="list" v-for="user in filteredUsers" :key="user.id">
                                    <td class="flex"
                                        style="width: 78px; height: 20px; padding-left: 26px; padding-bottom: 2px">
                                        <div class="custom-checkbox">
                                            <b-form-checkbox
                                                    :value="user.uuid"
                                                    v-model="selected"
                                                    @change="toggle"
                                                    stacked
                                            />
                                        </div>
                                    </td>
                                    <td style="width: 100px">
                                        <div class="row-item" style="margin-left: 27px">{{user.nextersNumber}}</div>
                                    </td>
                                    <td style="width: 86px;">
                                        <div v-if="user.position === 'DEVELOPER'" class="row-item" style="width: 100px">
                                            개발자
                                        </div>
                                        <div v-else-if="user.position === 'DESIGNER'" class="row-item"
                                             style="width: 100px">디자이너
                                        </div>
                                    </td>
                                    <td style="width: 86px;">
                                        <div class="row-item" style="width: 86px">{{user.name}}</div>
                                    </td>
                                    <td style="width: 594px;">
                                        <div class="row-item" style="width: 594px">{{user.id}}</div>
                                    </td>
                                    <td style="width: 160px;">
                                        <div v-if="user.activated" class="row-item select-box">
                                            <p>활동</p>
                                        </div>
                                        <div v-else class="row-item unselect-box">
                                            <p>비활동</p>
                                        </div>
                                    </td>
                                    <td style="width: 96px;">
                                        <div class="row-item" style="width: 96px">{{ user.createdAt | formatDate }}
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </b-form-group>
                    </div>
                </div>
            </div>
        </template>
    </Layout>
</template>

<script>
    import Layout from '@/components/common/layout/Layout';
    import {addActiveUsers, deleteActiveUsers, getAllUsers, getAuthCode, updateAuthCode} from "../../api/UserAPI";
    import Vue from 'vue';
    import moment from 'moment';

    export default {
        name: "AllUserManage",
        components: {Layout},
        data() {
            return {
                users: [],
                userViewList: [],
                search: '',
                sortActiveSessionASC: false,
                sortPositionASC: false,
                sortIsActiveASC: false,
                sortJoinDateASC: false,
                accessCode: '',
                selected: [],
                allSelected: false,
            }
        },
        methods: {
            moment,
            loadAllUsers() {
                getAllUsers()
                    .then(res => {
                        this.users = this.userViewList = res.data;
                        console.log(this.users)
                    });
                getAuthCode()
                    .then(res => {
                        this.accessCode = res.data.authenticationCode;
                    })
            },
            updateCode() {
                updateAuthCode(this.accessCode)
                    .then(res => {
                        this.accessCode = res.data.authenticationCode;
                        alert('성공적으로 업데이트 되었습니다.')
                    });
            },
            addActiveUsers() {
                addActiveUsers(this.selected)
                    .then(res => {
                        alert(this.selected.length + '명의 활동회원을 추가하였습니다.');
                        this.loadAllUsers();
                        this.toggleAll(false);
                        this.allSelected = false;
                    });
            },
            deleteActiveUsers() {
                deleteActiveUsers(this.selected)
                    .then(res => {
                        alert(this.selected.length + '명의 활동회원을 제거하였습니다.');
                        this.loadAllUsers();
                        this.toggleAll(false);
                        this.allSelected = false;
                    });
            },
            toggleAll(checked) {
                let selected = [];
                if (checked) {
                    this.users.forEach(function (user) {
                        selected.push(user.uuid);
                    });
                }
                this.selected = selected;
            },
            toggle(checked) {
                if (checked) {
                    if (this.users.length === this.selected.length + 1) {
                        this.allSelected = true;
                        this.toggleAll(true)
                    }
                } else {
                    this.allSelected = false;
                }
            },
            sorting(by) {
                let isAsc = true;
                if (by === 'id') {
                    this.sortActiveSessionASC = !this.sortActiveSessionASC;
                    isAsc = this.sortActiveSessionASC
                } else if (by === 'position') {
                    this.sortPositionASC = !this.sortPositionASC;
                    isAsc = this.sortPositionASC
                } else if (by === 'isActive') {
                    this.sortIsActiveASC = !this.sortIsActiveASC;
                    isAsc = this.sortIsActiveASC
                } else if (by === 'joinDate') {
                    this.sortJoinDateASC = !this.sortJoinDateASC;
                    isAsc = this.sortJoinDateASC
                }

                this.users = this.users.sort((idea1, idea2) => {
                    const position1 = idea1[by];
                    const position2 = idea2[by];

                    if (isAsc) {
                        if (position1 < position2) return -1;
                        if (position1 > position2) return 1;
                    } else {
                        if (position1 < position2) return 1;
                        if (position1 > position2) return -1;
                    }
                })
            },
            filtering() {
                // 한글
                if (this.search.match('^[ㄱ-ㅎ가-힣]*$')) {
                    const ChosungSearch = require('hangul-chosung-search-js');
                    const filterArray = this.users.map(element => element.name)
                        .concat(this.users.map(element => element.id));

                    const filteredList = ChosungSearch.searchList(this.search, filterArray, true);

                    this.userViewList = this.users.filter(post => {
                        return filteredList.includes(post.id) || filteredList.includes(post.name)
                    });
                    return;
                }

                // 영어
                const searchQuery = this.search.toLowerCase();
                this.userViewList = this.users.filter(idea => {
                    if (idea.id.toLowerCase().includes(searchQuery)) return true;
                    if (idea.name.toLowerCase().includes(searchQuery)) return true;
                })
            }
        },
        computed: {
            filteredUsers() {
                return this.userViewList;
            }
        },
        created() {
            this.loadAllUsers();
        }
    }

    Vue.filter('formatDate', function (value) {
        if (value) {
            return moment(value).format('YYYY.MM.DD')
        }
    })
</script>

<style>
    div.custom-control.custom-checkbox {
        display: table-cell;
        vertical-align: center;
    }

    label.custom-control-label::before, label.custom-control-label::after {
        display: table-cell;
        vertical-align: center;
        width: 20px;
        height: 20px;
    }

    input#checkbox-1.custom-control-input {
        display: table-cell;
        vertical-align: center;
        width: 0;
        height: 0;
    }
</style>

<style src="./AllUserManage.css" scoped>
</style>

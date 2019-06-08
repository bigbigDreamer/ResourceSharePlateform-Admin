/**
 * @time  2019/6/7 14:47
 * @author  Eric Wang <vuejs@vip.qq.com>
 * @desc  过滤路由
 */
import Home from '@/views/Home.vue'
import Main from '@/components/Main.vue'
import news from '@/components/news.vue'
import newsPublish from '@/views/news/newsPublish.vue'
import auditNews from '@/views/news/auditNews.vue'
import newsUpdate from '@/views/news/newsUpdate.vue'
import newsDel from '@/views/news/newsDel.vue'
import DismissedNews from '@/views/news/DismissedNews.vue'
import site from '@/components/site.vue'
import equipment from '@/components/equipment.vue'
import unionInfo from '@/views/MaintenWebsite/unionInfo.vue'
import CategoryManage from '@/views/EquipManage/CategoryManage.vue'
import DeviceDetailsManagement from '@/views/EquipManage/DeviceDetailsManagement.vue'
import DelEquipment from '@/views/EquipManage/DelEquipment.vue'
import UpdateEquipmentInfo from '@/views/EquipManage/UpdateEquipmentInfo.vue'
import OpenProjectAdd from '@/views/EquipManage/OpenProjectAdd.vue'
import OpenProjectDel from '@/views/EquipManage/OpenProjectDel.vue'
import OpenProjectManagement from '@/views/EquipManage/OpenProjectManagement.vue'
import AppointmentRecordDel from '@/views/EquipManage/AppointmentRecordDel.vue'
import pioneer from '@/components/pioneer.vue'
import ContentAdd from '@/views/BusinessGuidance/ContentAdd.vue'
import ContentUpdate from '@/views/BusinessGuidance/ContentUpdate.vue'
import ContentDel from '@/views/BusinessGuidance/ContentDel.vue'
import law from '@/components/law.vue'
import content from '@/components/content.vue'
import LawsAdd from '@/views/LawsAndRegulations/LawsAdd.vue'
import LawsUpdate from '@/views/LawsAndRegulations/LawsUpdate.vue'
import LawsDel from '@/views/LawsAndRegulations/LawsDel.vue'
// import Router from 'vue-router'
export default {
    filterRouter(routes) {
        routes.component = Home;
        routes.children.map(item => {
            switch (item.component) {
                case 'content':
                    item.component = content;
                    if (item.children) {
                        item.children.map(itemChild => {
                            if (itemChild.component === 'Main') {
                                itemChild.component = Main;
                            }
                            return true;
                        });
                    }
                    break;
                case 'news':
                    item.component = news;
                    if (item.children) {
                        item.children.map(itemChild => {
                            switch (itemChild.component) {
                                case 'newsPublish':
                                    itemChild.component = newsPublish;
                                    break;
                                case 'auditNews':
                                    itemChild.component = auditNews;
                                    break;
                                case 'newsUpdate':
                                    itemChild.component = newsUpdate;
                                    break;
                                case 'newsDel':
                                    itemChild.component = newsDel;
                                    break;
                                case 'DismissedNews':
                                    itemChild.component = DismissedNews;
                                    break;
                                default:
                                    console.log('无路由匹配');
                            }
                            return true;
                        });
                    }
                    break;
                case 'site':
                    item.component = site;
                    if (item.children) {
                        item.children.map(itemChild => {
                            if (itemChild.component === 'unionInfo') {
                                itemChild.component = unionInfo;
                            } else {
                                console.log('无路由匹配');
                            }
                            return true;
                        });
                    }
                    break;
                case 'equipment':
                    item.component = equipment;
                    if (item.children) {
                        item.children.map(itemChild => {
                            switch (itemChild.component) {
                                case 'CategoryManage':
                                    itemChild.component = CategoryManage;
                                    break;
                                case 'DeviceDetailsManagement':
                                    itemChild.component = DeviceDetailsManagement;
                                    break;
                                case 'DelEquipment':
                                    itemChild.component = DelEquipment;
                                    break;
                                case 'UpdateEquipmentInfo':
                                    itemChild.component = UpdateEquipmentInfo;
                                    break;
                                case 'OpenProjectAdd':
                                    itemChild.component = OpenProjectAdd;
                                    break;
                                case 'OpenProjectDel':
                                    itemChild.component = OpenProjectDel;
                                    break;
                                case 'OpenProjectManagement':
                                    itemChild.component = OpenProjectManagement;
                                    break;
                                case 'AppointmentRecordDel':
                                    itemChild.component = AppointmentRecordDel;
                                    break;
                                default:
                                    console.log('无路由匹配');
                            }
                            return true;
                        });
                    }
                    break;
                case 'pioneer':
                    item.component = pioneer;
                    if (item.children) {
                        item.children.map(itemChild => {
                            switch (itemChild.component) {
                                case 'ContentAdd':
                                    itemChild.component = ContentAdd;
                                    break;
                                case 'ContentUpdate':
                                    itemChild.component = ContentUpdate;
                                    break;
                                case 'ContentDel':
                                    itemChild.component = ContentDel;
                                    break;
                                default:
                                    console.log('无路由匹配');
                            }
                            return true;
                        });
                    }
                    break;
                case 'law':
                    item.component = law;
                    if (item.children) {
                        item.children.map(itemChild => {
                            switch (itemChild.component) {
                                case 'LawsAdd':
                                    itemChild.component = LawsAdd;
                                    break;
                                case 'LawsUpdate':
                                    itemChild.component = LawsUpdate;
                                    break;
                                case 'LawsDel':
                                    itemChild.component = LawsDel;
                                    break;
                                default:
                                    console.log('无路由匹配');
                            }
                            return true;
                        });
                    }
                    break;
                default:
                    console.log('无路由匹配');
            }
            return true;
        });

        return routes;
    }
}
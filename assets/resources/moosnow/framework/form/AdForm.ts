
import UIForm from "../ui/UIForm";
import EntityLogic from "../entity/EntityLogic";
import AdViewItem from "../entity/AdViewItem";


const { ccclass, property } = cc._decorator;

@ccclass
export default class AdForm extends UIForm {



    @property(cc.Node)
    public centerContainer: cc.Node = null;

    @property(cc.ScrollView)
    public centerView: cc.ScrollView = null;

    @property(cc.Layout)
    public centerLayout: cc.Layout = null;


    @property(cc.Node)
    public exportContainer: cc.Node = null;

    @property(cc.ScrollView)
    public exportView: cc.ScrollView = null;

    @property(cc.Layout)
    public exportLayout: cc.Layout = null;

    @property(cc.Node)
    public exportClose: cc.Node = null;

    @property(cc.Node)
    public exportMask: cc.Node = null;

    @property(cc.Node)
    public exportCloseTxt: cc.Node = null;

    @property(cc.Node)
    public bannerContainer: cc.Node = null;

    @property(cc.ScrollView)
    public bannerView: cc.ScrollView = null;

    @property(cc.Layout)
    public bannerLayout: cc.Layout = null;


    @property(cc.Node)
    public endContainer: cc.Node = null;

    @property(cc.ScrollView)
    public endView: cc.ScrollView = null;

    @property(cc.Layout)
    public endLayout: cc.Layout = null;

    @property(cc.Node)
    public floatContainer: cc.Node = null;

    @property(cc.Node)
    public leftContainer: cc.Node = null;

    @property(cc.ScrollView)
    public leftView: cc.ScrollView = null;

    @property(cc.Layout)
    public leftLayout: cc.Layout = null;

    @property(cc.ScrollView)
    public rightView: cc.ScrollView = null;

    @property(cc.Layout)
    public rightLayout: cc.Layout = null;


    @property(cc.Node)
    public sideContainer: cc.Node = null;

    @property(cc.ScrollView)
    public sideView: cc.ScrollView = null;

    @property(cc.Layout)
    public sideLayout: cc.Layout = null;

    @property(cc.Node)
    public btnSideShow: cc.Node = null;

    @property(cc.Node)
    public btnSideHide: cc.Node = null;



    public isMask: boolean = false;
    public isPopEffect: boolean = false;



    private mAdListBannerItem = "adListBannerItem"
    private mAdListCenterItem = "adListCenterItem"
    private mAdListExportItem = "adListExportItem"
    private mAdListLeftItem = "adListLeftItem"
    private mAdFloatLeftItem1 = "adFloatLeftItem1"
    private mAdFloatLeftItem2 = "adFloatLeftItem2"
    private mAdFloatLeftItem3 = "adFloatLeftItem3"
    private mAdListEndItem1 = "adListEndItem"

    constructor() {
        super();
    }

    start() {

    }

    public update(dt) {
        moosnow.control.adForm.onFwUpdate(dt);
    }
    /**
     * 
     * @param data 
     */
    public willShow(data) {
        moosnow.control.adForm.initProperty(this);
        moosnow.control.adForm.willShow(data);
        moosnow.control.adForm.onAfterShow = (index) => {
            // index 默认999
            //限时完成后，用户可以更改层级
            this.node.zIndex = index
        }
    }
    public onShow(data) {
        moosnow.ad.getAd(res => {
            moosnow.control.adForm.initView(this.bannerContainer, this.bannerView, this.bannerLayout, moosnow.AD_POSITION.BANNER, this.mAdListBannerItem);
            moosnow.control.adForm.initView(this.leftContainer, this.leftView, this.leftLayout, moosnow.AD_POSITION.LEFTRIGHT, this.mAdListBannerItem);
            moosnow.control.adForm.initView(this.leftContainer, this.rightView, this.rightLayout, moosnow.AD_POSITION.LEFTRIGHT, this.mAdListBannerItem);
            moosnow.control.adForm.initView(this.exportContainer, this.exportView, this.exportLayout, moosnow.AD_POSITION.LEFTRIGHT, this.mAdListExportItem);
            moosnow.control.adForm.initView(this.sideContainer, this.sideView, this.sideLayout, moosnow.AD_POSITION.SIDE, this.mAdListBannerItem);

            let points = [];
            let prefabs = [this.mAdFloatLeftItem1, this.mAdFloatLeftItem2, this.mAdFloatLeftItem1, this.mAdFloatLeftItem3]
            this.floatContainer.children.forEach((item, idx) => {
                if (item.name.indexOf('ad') != -1) {
                    points.push({ x: item.x, y: item.y })
                }
            });
            moosnow.control.adForm.initFloatAd(this.floatContainer, prefabs, points)
        })
    }



    public willHide() {
        moosnow.control.adForm.willHide();
    }




}
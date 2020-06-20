
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

    @property(cc.Node)
    public endLayout: cc.Node = null;

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

    @property(cc.Node)
    public extend1Container: cc.Node = null;
    @property(cc.ScrollView)
    public extend1View: cc.ScrollView = null;
    @property(cc.Layout)
    public extend1Layout: cc.Layout = null;

    @property(cc.Node)
    public extend2Container: cc.Node = null;
    @property(cc.ScrollView)
    public extend2View: cc.ScrollView = null;
    @property(cc.Layout)
    public extend2Layout: cc.Layout = null;

    @property(cc.Node)
    public extend3Container: cc.Node = null;
    @property(cc.ScrollView)
    public extend3View: cc.ScrollView = null;
    @property(cc.Layout)
    public extend3Layout: cc.Layout = null;

    @property(cc.Node)
    public extend4Container: cc.Node = null;
    @property(cc.ScrollView)
    public extend4View: cc.ScrollView = null;
    @property(cc.Layout)
    public extend4Layout: cc.Layout = null;


    @property(cc.Node)
    public topContainer: cc.Node = null;

    @property(cc.ScrollView)
    public topView: cc.ScrollView = null;

    @property(cc.Layout)
    public topLayout: cc.Layout = null;


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
        moosnow.control.adForm.onFwUpdate();
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
            // this.node.zIndex = index
        }
    }
    public onShow(data) {



        moosnow.ad.getAd(res => {
            moosnow.control.adForm.initView(this.topContainer, this.topView, this.topLayout, "位置0", this.mAdListBannerItem);
            moosnow.control.adForm.initView(this.bannerContainer, this.bannerView, this.bannerLayout, "位置1", this.mAdListBannerItem);
            moosnow.control.adForm.initView(this.leftContainer, this.leftView, this.leftLayout, "位置2", this.mAdListBannerItem);
            moosnow.control.adForm.initView(this.leftContainer, this.rightView, this.rightLayout, "位置3", this.mAdListBannerItem);
            moosnow.control.adForm.initView(this.exportContainer, this.exportView, this.exportLayout, "位置4", this.mAdListExportItem);
            moosnow.control.adForm.initView(this.centerContainer, this.centerView, this.centerLayout, "位置5", this.mAdListExportItem);
            moosnow.control.adForm.initView(this.sideContainer, this.sideView, this.sideLayout, "位置6", this.mAdListBannerItem);
            moosnow.control.adForm.initView(this.extend1Container, this.extend1View, this.extend1Layout, "位置8", this.mAdListBannerItem);
            moosnow.control.adForm.initView(this.extend2Container, this.extend2View, this.extend2Layout, "位置9", this.mAdListBannerItem);
            moosnow.control.adForm.initView(this.extend3Container, this.extend3View, this.extend3Layout, "位置10", this.mAdListBannerItem);
            moosnow.control.adForm.initView(this.extend4Container, this.extend4View, this.extend4Layout, "位置11", this.mAdListBannerItem);

            moosnow.control.adForm.initFiexdView(this.endContainer, this.endLayout, "位置7", this.mAdListExportItem, (res) => {
                console.log('跳转取消', res)

            })

            let points = [];
            let prefabs = [this.mAdFloatLeftItem1, this.mAdFloatLeftItem2, this.mAdFloatLeftItem1, this.mAdFloatLeftItem3]
            this.floatContainer.children.forEach((item, idx) => {
                if (item.name.indexOf('ad') != -1) {
                    points.push({ x: item.x, y: item.y })
                }
            });
            moosnow.control.adForm.initFloatAd(this.floatContainer, prefabs, points, "ICON", (res) => {
                console.log('跳转取消2', res)
                moosnow.form.showAd(moosnow.AD_POSITION.CENTER | moosnow.AD_POSITION.MASK | moosnow.AD_POSITION.BACK, () => {
                    moosnow.form.showAd(moosnow.AD_POSITION.RECOVER, () => {

                    })
                })
            })
        })
    }



    public willHide() {
        moosnow.control.adForm.willHide();
    }




}
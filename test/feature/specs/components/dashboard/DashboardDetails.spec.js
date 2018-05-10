import Buefy from 'buefy';
import { createLocalVue, mount } from '@vue/test-utils';
import i18n from '@/i18n';
import Tracker from '@/models/tracker';
import { storeFactory } from '@/store';
import { dummyTrackerData } from './../../../../fixtures/es6';
import DashboardDetails from '@/components/dashboard/DashboardDetails';

describe('DashboardDetails Component', () => {
    let store;
    let wrapper;
    let dummyTracker;

    beforeEach(() => {
        dummyTracker = new Tracker(dummyTrackerData);
        store = storeFactory();
        store.commit('trackers/store', dummyTracker);

        let localVue = createLocalVue();
        localVue.use(Buefy);

        wrapper = mount(DashboardDetails, {
            localVue,
            store,
            i18n,
            propsData: {
                tracker: dummyTracker,
            },
        });
    });

    it('has app tab', (done) => {
        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.tabs li').at(0).text()).to.contains(wrapper.vm.$t('message.dashboard.details.tabs.app'));
            expect(wrapper.find('.details-app').isVisible()).to.be.true;
            done();
        });
    });

    it('has request tab', (done) => {
        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.tabs li').at(1).text()).to.contains(wrapper.vm.$t('message.dashboard.details.tabs.request'));
            wrapper.findAll('.tabs li a').at(1).trigger('click');
            wrapper.vm.$nextTick(() => {
                expect(wrapper.find('.details-request').isVisible()).to.be.true;
                done();
            });
        });
    });

    it('has response tab', (done) => {
        wrapper.vm.$nextTick(() => {
            expect(wrapper.findAll('.tabs li').at(2).text()).to.contains(wrapper.vm.$t('message.dashboard.details.tabs.response'));
            wrapper.findAll('.tabs li a').at(2).trigger('click');
            wrapper.vm.$nextTick(() => {
                expect(wrapper.find('.details-response').isVisible()).to.be.true;
                done();
            });
        });
    });
});
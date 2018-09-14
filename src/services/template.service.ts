import { Service } from '../dependency-injections/decorators';
import { HOST, APP_NAME } from '../configs/config';

@Service()
class TemplateService {
    titleMap: Object = {
        forgot: APP_NAME + ':forgot password',
        register: APP_NAME + ':register to app'
    }

    getTemplate(key: string, hash) {
        let html: string;
        switch (key) {
            case 'forgot':
                html = '<p>Hi,</p><br /><p>If you want to reset your password click <a href="' + HOST + '/change-password/' + hash + '">here<a/></p>';
                break;
            case 'register':
                html = '<p>Hi,</p><br /><p>If you want to register to ' + APP_NAME + ' click <a href="' + HOST + '/register/' + hash + '">here<a/></p>';
                break;
        }
        return html;
    }
    getTitle(key) {
        return this.titleMap[key];
    }
}

export default TemplateService;


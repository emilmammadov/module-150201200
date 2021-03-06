import {Component, OnInit} from '@angular/core';
import {FirestoreService} from '../services/moduleFirebaseService/firestore.service';
import * as firebase from 'firebase';
import {AlertController, NavController, ToastController} from '@ionic/angular';
import {SQLService} from '../services/sqlService/sql.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';

@Component({
    selector: 'app-post-send',
    templateUrl: './post-send.page.html',
    styleUrls: ['./post-send.page.scss'],
})
export class PostSendPage implements OnInit {

    currentCity;
    uid: string;
    username: string;
    body: string;
    locationString: string;

    cities: any[] = [
        {
            name: 'Adana',
            plate: 1
        },
        {
            name: 'ADIYAMAN',
            plate: 2
        },
        {
            name: 'AFYONKARAHİSAR',
            plate: 3
        },
        {
            name: 'AĞRI',
            plate: 4
        },
        {
            name: 'AMASYA',
            plate: 5
        },
        {
            name: 'ANKARA',
            plate: 6
        },
        {
            name: 'ANTALYA',
            plate: 7
        },
        {
            name: 'ARTVİN',
            plate: 8
        },
        {
            name: 'AYDIN',
            plate: 9
        },
        {
            name: 'BALIKESİR',
            plate: 10
        },
        {
            name: 'BİLECİKK',
            plate: 11
        },
        {
            name: 'BİNGÖL',
            plate: 12
        },
        {
            name: 'BİTLİS',
            plate: 13
        },
        {
            name: 'BOLU',
            plate: 14
        },
        {
            name: 'BURDUR',
            plate: 15
        },
        {
            name: 'BURSA',
            plate: 16
        },
        {
            name: 'ÇANAKKALE',
            plate: 17
        },
        {
            name: 'ÇANKIRI',
            plate: 18
        },
        {
            name: 'ÇORUM',
            plate: 19
        },
        {
            name: 'DENİZLİ',
            plate: 20
        },
        {
            name: 'DİYARBAKIR',
            plate: 21
        },
        {
            name: 'EDİRNE',
            plate: 22
        },
        {
            name: 'ELAZIĞ',
            plate: 23
        },
        {
            name: 'ERZİNCAN',
            plate: 24
        },
        {
            name: 'ERZURUM',
            plate: 25
        },
        {
            name: 'ESKİŞEHİR',
            plate: 26
        },
        {
            name: 'GAZİANTEP',
            plate: 27
        },
        {
            name: 'GİRESUN',
            plate: 28
        },
        {
            name: 'GÜMÜŞHANE',
            plate: 29
        },
        {
            name: 'HAKKARİ',
            plate: 30
        },
        {
            name: 'HATAY',
            plate: 31
        },
        {
            name: 'ISPARTA',
            plate: 32
        },
        {
            name: 'MERSİN',
            plate: 33
        },
        {
            name: 'İSTANBUL',
            plate: 34
        },
        {
            name: 'İZMİR',
            plate: 35
        },
        {
            name: 'KARS',
            plate: 36
        },
        {
            name: 'KASTAMONU',
            plate: 37
        },
        {
            name: 'KAYSERİ',
            plate: 38
        },
        {
            name: 'KIRKLARELİ',
            plate: 39
        },
        {
            name: 'KIRŞEHİR',
            plate: 40
        },
        {
            name: 'KOCAELİ',
            plate: 41
        },
        {
            name: 'KONYA',
            plate: 42
        },
        {
            name: 'KÜTAHYA',
            plate: 43
        },
        {
            name: 'MALATYA',
            plate: 44
        },
        {
            name: 'MANİSA',
            plate: 45
        },
        {
            name: 'KAHRAMANMARAŞ',
            plate: 46
        },
        {
            name: 'MARDİN',
            plate: 47
        },
        {
            name: 'MUĞLA',
            plate: 48
        },
        {
            name: 'MUŞ',
            plate: 49
        },
        {
            name: 'NEVŞEHİR',
            plate: 50
        },
        {
            name: 'NİĞDE',
            plate: 51
        },
        {
            name: 'ORDU',
            plate: 52
        },
        {
            name: 'RİZE',
            plate: 53
        },
        {
            name: 'SAKARYA',
            plate: 54
        },
        {
            name: 'SAMSUN',
            plate: 55
        },
        {
            name: 'SİİRT',
            plate: 56
        },
        {
            name: 'SİNOP',
            plate: 57
        },
        {
            name: 'SİVAS',
            plate: 58
        },
        {
            name: 'TEKİRDAĞ',
            plate: 59
        },
        {
            name: 'TOKAT',
            plate: 60
        },
        {
            name: 'TRABZON',
            plate: 61
        },
        {
            name: 'TUNCELİ',
            plate: 62
        },
        {
            name: 'ŞANLIURFA',
            plate: 63
        },
        {
            name: 'UŞAK',
            plate: 64
        },
        {
            name: 'VAN',
            plate: 65
        },
        {
            name: 'YOZGAT',
            plate: 66
        },
        {
            name: 'ZONGULDAK',
            plate: 67
        },
        {
            name: 'AKSARAY',
            plate: 68
        },
        {
            name: 'BAYBURT',
            plate: 69
        },
        {
            name: 'KARAMAN',
            plate: 70
        },
        {
            name: 'KIRIKKALE',
            plate: 71
        },
        {
            name: 'BATMAN',
            plate: 72
        },
        {
            name: 'ŞIRNAK',
            plate: 73
        },
        {
            name: 'BARTIN',
            plate: 74
        },
        {
            name: 'ARDAHAN',
            plate: 75
        },
        {
            name: 'IĞDIR',
            plate: 76
        },
        {
            name: 'YALOVA',
            plate: 77
        },
        {
            name: 'KARABÜK',
            plate: 78
        },
        {
            name: 'KİLİS',
            plate: 79
        },
        {
            name: 'OSMANİYE',
            plate: 80
        },
        {
            name: 'DÜZCE',
            plate: 81
        },
    ];

    constructor(private firebaseService: FirestoreService,
                private toastController: ToastController,
                private navCtrl: NavController,
                private alertController: AlertController,
                private sqlService: SQLService,
                private geolocation: Geolocation) {
    }

    ngOnInit() {
        firebase.auth().onAuthStateChanged(user => {
            this.uid = user.uid;
            this.username = user.displayName;
        });

        this.geolocation.getCurrentPosition().then(resp => {
            this.locationString = 'Şehir eklerken lokasyonuna dikkat et. Uygulamamız ücretsiz olduğu için' +
                ' lokasyonundan bulunduğun şehri bulamıyoruz.' +
                '\nŞuanki lokaysonun: ' + resp.coords.latitude + ', ' + resp.coords.longitude;
        });
    }

    uploadPost() {
        this.sqlService.db.executeSql('INSERT INTO table_name VALUES (' + this.body + ', ' + this.currentCity.name + ', 0)');
    }

    async presentToast(msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }

    async presentAlert() {
        const alert = await this.alertController.create({
            header: 'Hata',
            message: 'Gönderiniz yayınlanırken bir hata oluştu',
            buttons: ['Tamam']
        });
        await alert.present();
    }

    saveClick() {
        const post = {
            body: this.body,
            city: this.currentCity,
            ownerID: this.uid,
            ownerUsername: this.username,
            invitations: [],
        };

        this.firebaseService.uploadPost(this.uid, post).then(data => {
            this.presentToast('Gönderiniz yayınlanmaya hazır');
            this.uploadPost();
            this.navCtrl.navigateRoot('posts/timeline');
        }).catch(err => {
            this.presentAlert();
            console.log(err);
        });
    }

}

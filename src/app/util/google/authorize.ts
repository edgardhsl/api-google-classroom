import fs from 'fs';
import readLine from 'readline';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { GetTokenResponse } from 'google-auth-library/build/src/auth/oauth2client';

const TOKEN_PATH = __dirname + '/../../cache/googleapis/token.json';
const SCOPES = [
    'https://www.googleapis.com/auth/classroom.courses',
    'https://www.googleapis.com/auth/classroom.announcements',
    'https://www.googleapis.com/auth/classroom.rosters',
];

export class Authorize {

    private _oAuth2Client?: OAuth2Client;
    get authClient() {
        return this._oAuth2Client;
    }

    constructor(credentialsPath: string) {
        this._auth(credentialsPath);
    }

    private _auth(credentialsPath: string){
        const credentials = fs.readFileSync(credentialsPath, {encoding:'utf8', flag:'r'}) as any;
        const {client_secret, client_id, redirect_uris} = JSON.parse(credentials)?.web;

        this._oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]) as any;
        
        if(this._oAuth2Client) {
            this._updateToken(this._oAuth2Client);
        }
    }

    private _updateToken(oAuth: OAuth2Client) {
        try {
            const token = JSON.parse(fs.readFileSync(TOKEN_PATH, {encoding:'utf8', flag:'r'})) as GetTokenResponse;
            oAuth.setCredentials(token.tokens);
        } catch(ex) {
            this._getAccessToken(oAuth);
        }
    }

    private _getAccessToken(oAuth: OAuth2Client) {
        const authUrl = oAuth.generateAuthUrl({
          access_type: 'offline',
          scope: SCOPES,
        });

        console.log('Authorize this app by visiting this url:', authUrl);
        
        const rl = readLine.createInterface({
          input: process.stdin,
          output: process.stdout,
        });

        rl.question('Enter the code from that page here: ', async (code) => {
          rl.close();
          const token = await oAuth.getToken(code);
          fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
          oAuth.setCredentials(token.tokens);
        })
    }
}
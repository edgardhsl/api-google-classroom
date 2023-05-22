import fs from 'fs';
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

    private _authUrl?: string;
    private _oAuth2Client?: OAuth2Client;

    get authClient() {
        return this._oAuth2Client;
    }

    get authUrl() {
        return this._authUrl;
    }

    constructor(credentialsPath: string) {
        this._auth(credentialsPath);
    }

    async authorize(code: string) {
        if(!this.authClient) return;

        const token = await this.authClient.getToken(code);
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
        this.authClient.setCredentials(token.tokens);
    }

    private _auth(credentialsPath: string) {
        const credentials = fs.readFileSync(credentialsPath, { encoding: 'utf8', flag: 'r' }) as any;
        const { client_secret, client_id, redirect_uris } = JSON.parse(credentials)?.web;

        this._oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]) as any;

        if (this._oAuth2Client) {
            this._updateToken(this._oAuth2Client);
        }
    }

    private _updateToken(oAuth: OAuth2Client) {
        try {
            const token = JSON.parse(fs.readFileSync(TOKEN_PATH, { encoding: 'utf8', flag: 'r' })) as GetTokenResponse;

            if (token.res?.data?.expiry_date <= (new Date()).getTime()) {
                throw 'Expired token';
            }

            oAuth.setCredentials(token.tokens);
        } catch (ex) {
            this._getAccessToken(oAuth);
        }
    }

    private _getAccessToken(oAuth: OAuth2Client) {
        this._authUrl = oAuth.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });

        console.log("\n\n É necessário configurar a autorização para o uso da API do Google Classroom, para isso clique no link abaixo:");
        console.log("\n http://localhost:4444/auth/authorize \n\n");
    }
}
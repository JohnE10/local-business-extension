
import { isAbsoluteUrl } from 'next/dist/shared/lib/utils';
import { createDirectoryAndSaveFile } from './backEndHelpers';
import { isValidUrl, stringContains } from '../../utils/helpers';
import Business from '../../models/business';
import { dbConnect } from '../../middleware/dbConnect';
import mongoose from 'mongoose';



const fs = require('fs');
const path = require('path');

const customPageWorkAPI = async (req, res) => {

    try {

        // update field

        const updatefield = () => {
            const fieldValues = [
                'no email',
            ];
            fieldValues.map(async (ele) => {
                await Business.updateMany({ url: 'galcanelectric.com' }, { $set: { email: ele } })
            })
        };
        updatefield();

        /* ------------------------- */

        const deleteByIds = () => {
            const fieldValues = [
                '64af3a7c48fd212f154d51d7',
                '64af3a7d48fd212f154d51da',
                '64af3a7d48fd212f154d51dd',
                '64af3a7e48fd212f154d51e0',
                '64af3a7e48fd212f154d51e3',
                '64af3a7e48fd212f154d51e6',
                '64af3a7f48fd212f154d51e9',
                '64af3a7f48fd212f154d51ec',
                '64af3a8048fd212f154d51ef',
            ];

            fieldValues.map(async (ele) => {
                const obj = {};
                obj['_id'] = ele;
                await Business.deleteOne(obj);
            })
        };
        // deleteByIds();

        /* ------------------------- */

        // create document for objects with email and url only;
        const createDocumentHasObjAndEmailOnly = async () => {
            let headers = Object.keys(Business.schema.obj);

            headers = headers.filter((element) => element != 'numberOfEmails' && element != 'dateEmailedLast');
            console.log({ headers });

            // insert into db
            let objArr = {};

            objArr['url'] = 'tempStuff.com';
            objArr['email'] = 'someGuyorGal@tempStuff.com';

            headers.map((ele) => {
                if (!objArr[ele]) {
                    objArr[ele] = `no ${ele}`;
                }
            })

            console.log({ objArr });


            await Business.create(objArr);

            return res.json({ success: 'temp' });
        }
        // createDocumentHasObjAndEmailOnly();

        /*----------------------------*/

        // remove data from specific field for all documents in collection
        const removeDataFromField = async (field) => {

            const fieldToUpdate = field;
            const newValue = 'no email';

            const allArr = await Business.updateMany({ [fieldToUpdate]: { $exists: true } }, { $set: { [fieldToUpdate]: newValue } });

            console.log({ allArr });
        }
        // removeDataFromField('email');

        /*----------------------------*/

        // create document in collection given an object
        const objArr = [
            {
                name: 'Mid-City A/c & Electric',
                url: 'midcityac.com',
                page: 'http://midcityac.com/',
                email: 'no email',
                phone: 'no phone',
                advertising: 'no advertising',
                chat: 'no chat',
                rating: '4,8',
                reviews: '44',
                industry: 'no industry',
                city: 'Baton Rouge',
                state: 'louisiana',
                search: 'electrician Baton Rouge louisiana'
            }
        ]
        const createDocument = async (objArr) => {
            await Business.create(objArr);
        }
        // createDocument(objArr);

        /*----------------------------*/

        const findDupesByField = async (field) => {

            const documents = await Business.find();

            const fieldElements = documents.map(ele => ele.field);

        }
        // const results = findDupesByField('page');



        // return res.json({ success: results });
        return res.json({ success: 'done' });

    } catch (error) {
        console.log('customPageWorkAPI error: ', error.message);
        return res.json({ error: 'customPageWorkAPI error: ' + error.message });
    }
}

export default customPageWorkAPI;
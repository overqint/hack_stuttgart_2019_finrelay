import * as api from '../src';
import CJSON from 'circular-json';
import * as fs from 'fs';

const importedAccessToken = {
  access_token:
    'eyJraWQiOiJyc2ExIiwiYWxnIjoiUlM1MTIifQ.eyJzdWIiOiIxMDAxMDAzNDA1MDAwMDEiLCJhenAiOiJkZXZlbG9wZXJwb3J0YWwiLCJpc3MiOiJodHRwczpcL1wvc2ltdWxhdG9yLWFwaS5kYi5jb21cL2d3XC9vaWRjXC8iLCJleHAiOjE1NzIwMTgyOTMsImlhdCI6MTU3MjAxNDY5MywianRpIjoiMTI1MGViZTItZjE2NC00NWJiLWE2MWQtMmRlYTQ2MWMyYTdiIn0.RUfyrE46eFNA4VIb4hIJFzgNvmvxsifDS4rMrbcdGVkWRDR9nwPr5eJjG1CIy-zw3K-CAoHZ3xGjxmLL4WIKpBrCYdWEjCWCDbpcdyH6nWlYVnHLB76NiKEvqWp7wJN49eGPNbgjaus0Hl-MiSm5SPVQMs80u13Jc8I_E1ubK_7VLTih8LilAwktL0cg-RhzRsSooCI3_qH2dNGQVzpTyLuGlPM3uKdwkZLL4ji9dEMjHEHbELsgrvxT-q1FFTcTSM0JPgYuk0Qi_AjmW8l9MNF2yx_VxxxObmjKLA5o_98bL2LqBCZUJHHGlk5VB5_JbAtNcdXsm-BD8v0y0qZL-w',
};

const accessToken = importedAccessToken.access_token;

describe('blah', () => {
  it('works', async () => {
    const client = new api.TransactionsApi({ accessToken });
    const result = await client.getCashAccountTransactions(
      'DE10010000000000005211'
    );
    const data = result.data;
    fs.wr;
    console.log(JSON.stringify(data, null, 2));
  });
});

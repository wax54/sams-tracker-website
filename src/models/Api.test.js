jest.unmock('./Api');
import Api from './Api';
import axios from 'axios';


jest.mock('axios');



describe("#request", () => {
    const someData = [{
        handle: 'bauer-gallagher',
        name: 'Bauer-Gallagher',
        num_employees: 862,
        description: 'Difficult ready trip question produce produce someone.',
        logo_url: undefined
    }];

    it("should return {status: true, data: resp.data}",
        async () => {
            axios.mockImplementationOnce((request) => {
                return Promise.resolve({ data: someData });
            });
            const result = await Api.request({ method:"get", url:"hello", data:"GOODBYE" });
            expect(result).toEqual({status:true, data: someData});
    }); 
    it("should return {status: false, errors:e.response.data.error.message} on throw",
        async () => {
            const testErrorMessage = "TEST_ERROR";
            axios.mockImplementationOnce((request) => {
                const e =  new Error(testErrorMessage);
                e.response = {data:{error:{ message: testErrorMessage}}};
                throw e;
            });
            const result = await Api.request({ method: "get", url: "hello", data: "GOODBYE" });
            expect(result).toEqual({ status: false, errors: [testErrorMessage] });
    });
    
});


describe("#login", () => {
    const valid_resp = {
        user: {
            name: 'Bauer-Gallagher'
        },
        token: "A GOOD TOKEN"
    };
    const valid_user = {username: "testUser", password:"testPassword"}

    it("should return {status: true, user: resp.data.user}",
        async () => {
            axios.mockImplementationOnce((request) => {
                if(request.data.username === valid_user.username &&
                    request.data.password === valid_user.password)
                    return Promise.resolve({ data: valid_resp });
            });

            const result = await Api.login(valid_user);
            expect(result).toEqual({ status: true, user: valid_resp.user });
    });

    it("should update Api.token to the new token",
        async () => {
            axios.mockImplementationOnce((request) => {
                if (request.data.username === valid_user.username &&
                    request.data.password === valid_user.password)
                    return Promise.resolve({ data: valid_resp });
            });

            await Api.login(valid_user);
            expect(Api.token).toEqual(valid_resp.token);
    });

    it("should update local storage",
        async () => {
            axios.mockImplementationOnce((request) => {
                if (request.data.username === valid_user.username &&
                    request.data.password === valid_user.password)
                    return Promise.resolve({ data: valid_resp });
            });

            await Api.login(valid_user);
            expect(localStorage.USERTOKEN).toEqual(valid_resp.token);
    });
    it("should return {status: false, errors:e.response.data.error.message} on throw",
        async () => {
            const testErrorMessage = "TEST_ERROR";
            axios.mockImplementationOnce((request) => {
                const e = new Error(testErrorMessage);
                e.response = { data: { error: { message: testErrorMessage } } };
                throw e;
            });
            const resp = await Api.login(valid_user);
            expect(resp).toEqual({ status: false, errors: [testErrorMessage] });
    });
});

// describe("#getDrinks", () => {
//     const testItem = {
//         data: [{
//             id: "martini",
//             name: "Martini",
//             description: "An ice-cold, refreshing classic.",
//             recipe: "Mix 3 parts vodka & 1 part dry vermouth.",
//             serve: "Serve very cold, straight up."
//         }]
//     };

//     it("should return [{ id, name, description, recipe, serve },...]", async () => {
//         axios.get.mockImplementationOnce(() => Promise.resolve(testItem));
//         const result = await Api.getDrinks();
//         expect(result).toEqual(testItem.data);
//     });
// });


// describe("#createMenuItem", () => {
//     const testItem = {
//         id: "martini",
//         name: "Martini",
//         category: "drinks",
//         description: "An ice-cold, refreshing classic.",
//         recipe: "Mix 3 parts vodka & 1 part dry vermouth.",
//         serve: "Serve very cold, straight up."
//     };

//     it("should return { id, name, description, recipe, serve } if valid data", async () => {
//         let requestData;
//         axios.post.mockImplementationOnce((route, data) => {
//             requestData = data;
//             return Promise.resolve({ data })
//         });
//         const result = await Api.createMenuItem(testItem);
//         expect(result).toEqual({ ...testItem, category: undefined });
//         expect(requestData).toEqual({ ...testItem, category: undefined });
//     });

//     it("should return false if category invalid", async () => {

//         let requestData;
//         axios.post.mockImplementationOnce((route, data) => {
//             requestData = data;
//             return Promise.resolve({ data })
//         });
//         const result = await Api.createMenuItem({ ...testItem, category: 'trash' });

//         expect(result).toEqual(false);
//         expect(requestData).toEqual(undefined);
//     });
//     it("should return false if request error", async () => {

//         axios.post.mockImplementationOnce((route, data) => {
//             return Promise.reject(Error("DB ERROR"))
//         });
//         const result = await Api.createMenuItem({ ...testItem, category: 'trash' });

//         expect(result).toEqual(false);
//     });
// });
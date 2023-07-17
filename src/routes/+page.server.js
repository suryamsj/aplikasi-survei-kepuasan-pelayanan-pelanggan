import axios from "axios";

/** @type {import('./$types').PageLoad} */
export async function load() {
    async function getData(){
        const response = await axios.get(`http://localhost/survei/api/survey.php?function=select_data`);
        const result = await response.data;

        return result;
    }

    return {success:true, survei:getData()}
}

/** @type {import('./$types').Actions} */
export const actions = {
    sangat_puas: async () => {
        const insertToDb = await axios.post(
            `http://localhost/survei/api/survey.php?function=create`,new URLSearchParams({
                result:"Sangat Puas",
            })
        );

        if (insertToDb.data.status !== 201) {
            return error(500, "Server bermasalah");
        }

        return { 
            success: true 
        };
    },

    puas: async () => {
        const insertToDb = await axios.post(
            `http://localhost/survei/api/survey.php?function=create`,
            new URLSearchParams({
                result:"Puas",
            })
        );

        if (insertToDb.data.status !== 201) {
            return error(500, "Server bermasalah");
        }

        return { success: true };
    },

    kurang_puas: async () => {
        const insertToDb = await axios.post(
            `http://localhost/survei/api/survey.php?function=create`,
            new URLSearchParams({
                result:"Kurang Puas",
            })
        );

        if (insertToDb.data.status !== 201) {
            return error(500, "Server bermasalah");
        }

        return { success: true };
    },

    tidak_puas: async () => {
        const insertToDb = await axios.post(
            `http://localhost/survei/api/survey.php?function=create`,
            new URLSearchParams({
                result:"Tidak Puas",
            })
        );

        if (insertToDb.data.status !== 201) {
            return error(500, "Server bermasalah");
        }

        return { success: true };
    }
};

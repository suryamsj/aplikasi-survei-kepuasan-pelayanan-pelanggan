import axios from "axios";

export const actions = {
    sangat_puas: async () => {
        const insertToDb = await axios.post(
            `http://localhost/rest_api/api/survey.php?function=create`,new URLSearchParams({
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
            `http://localhost/rest_api/api/survey.php?function=create`,
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
            `http://localhost/rest_api/api/survey.php?function=create`,
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
            `http://localhost/rest_api/api/survey.php?function=create`,
            new URLSearchParams({
                result:"Tidak Puas",
            })
        );

        if (insertToDb.data.status !== 201) {
            return error(500, "Server bermasalah");
        }

        return { success: true };
    }
}


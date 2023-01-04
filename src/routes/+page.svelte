<script>
    import { onMount } from "svelte";
    import { getTotal, getPercentage } from "$lib/utils";
    import { store } from "$lib/store";
    import axios from "axios";
    import toast, { Toaster } from "svelte-french-toast";
    import BoxInset from "$lib/components/BoxInset.svelte";
    import Footer from "$lib/components/Footer.svelte";

    let loading = false;
    let total_data = 0;
    let sangat_puas = 0;
    let puas = 0;
    let kurang_puas = 0;
    let tidak_puas = 0;

    onMount(async () => {
        $store = await getDataFromApi();
        total_data = totalData($store);
        sangat_puas = totalDataModel($store.data[0].sangat_puas, total_data);
        puas = totalDataModel($store.data[0].puas, total_data);
        kurang_puas = totalDataModel($store.data[0].kurang_puas, total_data);
        tidak_puas = totalDataModel($store.data[0].tidak_puas, total_data);
    });

    // Get Data from API
    const getDataFromApi = async () => {
        try {
            const response = await axios.get(
                `http://localhost/rest_api/api/survey.php?function=select_data`
            );
            return response.data;
        } catch (err) {
            console.log(err);
        }
    };

    // Get Total Data
    const totalData = (data) => {
        let totalData =
            getTotal(data.data[0].sangat_puas) +
            getTotal(data.data[0].puas) +
            getTotal(data.data[0].kurang_puas) +
            getTotal(data.data[0].tidak_puas);
        return totalData;
    };

    // Get Total Data / Model
    const totalDataModel = (data, total) => {
        let totalModel = getPercentage(getTotal(data), total);
        return totalModel;
    };

    // Handle Submit
    const handleSubmit = async (value) => {
        try {
            loading = true;
            const response = await axios.post(
                `http://localhost/rest_api/api/survey.php?function=create`,
                new URLSearchParams({
                    result: value,
                })
            );
            if (response.data.status === 201) {
                toast.success("success", {
                    style: "background:#d2dbee;border:2px solid #bec6d8; padding: 16px;box-shadow:5px 5px 5px rgba(0,0,0,0.1);",
                    icon: "✅",
                    position: "bottom-center",
                });
            } else {
                toast.error("failed", {
                    style: "background:#d2dbee;border:2px solid #bec6d8; padding: 16px;box-shadow:5px 5px 5px rgba(0,0,0,0.1);",
                    icon: "❌",
                    position: "bottom-center",
                });
            }
            await updateAll();
        } catch (err) {
            console.log(err);
        } finally {
            loading = false;
        }
    };

    // Update all data
    const updateAll = async () => {
        $store = await getDataFromApi();
        total_data = totalData($store);
        sangat_puas = totalDataModel($store.data[0].sangat_puas, total_data);
        puas = totalDataModel($store.data[0].puas, total_data);
        kurang_puas = totalDataModel($store.data[0].kurang_puas, total_data);
        tidak_puas = totalDataModel($store.data[0].tidak_puas, total_data);
    };
</script>

<!-- Start Header -->
<header class="box_inset">
    <div class="row">
        <div class="col-lg-12 col-md-12 col-12">
            <div class="d-flex align-items-center justify-content-center">
                <i class="bi-people text-success me-3 fs-3" />
                <h1 class="h5 pt-2">Survei Kepuasan Pelayanan Pelanggan +26</h1>
            </div>
        </div>
    </div>
</header>
<!-- End Header -->

<!-- Start Toats -->
<Toaster />
<!-- End Toats -->

<!-- Start Survei -->
<section class="section">
    <div class="row text-center">
        <div class="col-lg-3 col-md-6 col-12">
            <BoxInset result={sangat_puas}>
                <i class="bi-emoji-heart-eyes text-success" slot="logo" />
                <h5 slot="title">Sangat Puas</h5>
                <form
                    on:submit|preventDefault={() => handleSubmit("Sangat Puas")}
                    method="post"
                >
                    <button
                        type="submit"
                        class="btn btn-outline-success w-100"
                        disabled={loading}
                        >{loading ? "Loading" : "Pilih"}</button
                    >
                </form>
            </BoxInset>
        </div>
        <div class="col-lg-3 col-md-6 col-12">
            <BoxInset result={puas}>
                <i class="bi-emoji-laughing text-info" slot="logo" />
                <h5 slot="title">Puas</h5>
                <form
                    on:submit|preventDefault={() => handleSubmit("Puas")}
                    method="post"
                >
                    <button
                        type="submit"
                        class="btn btn-outline-info w-100"
                        disabled={loading}
                        >{loading ? "Loading" : "Pilih"}</button
                    >
                </form>
            </BoxInset>
        </div>
        <div class="col-lg-3 col-md-6 col-12">
            <BoxInset result={kurang_puas}>
                <i class="bi-emoji-frown text-warning" slot="logo" />
                <h5 slot="title">Kurang Puas</h5>
                <form
                    on:submit|preventDefault={() => handleSubmit("Kurang Puas")}
                    method="post"
                >
                    <button
                        type="submit"
                        class="btn btn-outline-warning w-100"
                        disabled={loading}
                        >{loading ? "Loading" : "Pilih"}</button
                    >
                </form>
            </BoxInset>
        </div>
        <div class="col-lg-3 col-md-6 col-12">
            <BoxInset result={tidak_puas}>
                <i class="bi-emoji-angry text-danger" slot="logo" />
                <h5 slot="title">Tidak Puas</h5>
                <form
                    on:submit|preventDefault={() => handleSubmit("Tidak Puas")}
                    method="post"
                >
                    <button
                        type="submit"
                        class="btn btn-outline-danger w-100"
                        disabled={loading}
                        >{loading ? "Loading" : "Pilih"}</button
                    >
                </form>
            </BoxInset>
        </div>
    </div>
</section>
<!-- End Survei -->

<!-- Start Result -->
<section class="section">
    <div class="row">
        <div class="col-lg-12 col-md-12 col-12">
            <div class="box_inset">
                <div class="bar mb-3">
                    <h6>Sangat Puas</h6>
                    <div
                        class="progress"
                        role="progressbar"
                        aria-label="Animated striped example"
                        aria-valuenow={sangat_puas}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    >
                        <div
                            class="progress-bar progress-bar-striped progress-bar-animated bg-success"
                            style="width: {sangat_puas + `%`}"
                        >
                            {sangat_puas + "%"}
                        </div>
                    </div>
                </div>
                <div class="bar mb-3">
                    <h6>Puas</h6>
                    <div
                        class="progress"
                        role="progressbar"
                        aria-label="Animated striped example"
                        aria-valuenow={puas}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    >
                        <div
                            class="progress-bar progress-bar-striped progress-bar-animated bg-info"
                            style="width: {puas + `%`}"
                        >
                            {puas + "%"}
                        </div>
                    </div>
                </div>
                <div class="bar mb-3">
                    <h6>Kurang Puas</h6>
                    <div
                        class="progress"
                        role="progressbar"
                        aria-label="Animated striped example"
                        aria-valuenow={kurang_puas}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    >
                        <div
                            class="progress-bar progress-bar-striped progress-bar-animated bg-warning"
                            style="width: {kurang_puas + `%`}"
                        >
                            {kurang_puas + "%"}
                        </div>
                    </div>
                </div>
                <div class="bar">
                    <h6>Tidak Puas</h6>
                    <div
                        class="progress"
                        role="progressbar"
                        aria-label="Animated striped example"
                        aria-valuenow={tidak_puas}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    >
                        <div
                            class="progress-bar progress-bar-striped progress-bar-animated bg-danger"
                            style="width: {tidak_puas + `%`}"
                        >
                            {tidak_puas + "%"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<!-- End Result -->

<!-- Start Footer -->
<Footer />
<!-- End Footer -->

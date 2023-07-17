<script>
    import { enhance } from "$app/forms";
    import { getTotal, getPercentage } from "$lib/utils";
    import toast, { Toaster } from "svelte-french-toast";
    import BoxInset from "$lib/components/BoxInset.svelte";
    import Footer from "$lib/components/Footer.svelte";

    export let data;

    const handleSubmit = () => {
        return async ({ result, update }) => {
            switch (result.type) {
                case "success":
                    toast.success("success", {
                        style: "background:#d2dbee;border:2px solid #bec6d8; padding: 16px;box-shadow:5px 5px 5px rgba(0,0,0,0.1);",
                        icon: "✅",
                        position: "bottom-center",
                    });
                    break;
                case "error":
                    toast.error("failed", {
                        style: "background:#d2dbee;border:2px solid #bec6d8; padding: 16px;box-shadow:5px 5px 5px rgba(0,0,0,0.1);",
                        icon: "❌",
                        position: "bottom-center",
                    });
                default:
                    break;
            }
            await update();
        };
    };

    /**
     * This is a function to sum all seurvey results.
     *
     * @param {number} data - A number param
     * @return {number} - A good number
     *
     */
    const totalData = (data) => {
        let totalData =
            getTotal(data.data[0].sangat_puas) +
            getTotal(data.data[0].puas) +
            getTotal(data.data[0].kurang_puas) +
            getTotal(data.data[0].tidak_puas);
        return totalData;
    };

    /**
     * This is a function to get total percentage form all survey results.
     *
     * @param {number} data - A number param
     * @param {number} total - A number param
     * @return {number} - A good number
     *
     */
    const totalDataModel = (data, total) => {
        let totalModel = getPercentage(getTotal(data), total);
        return totalModel;
    };

    $: ({ survei } = data);
    $: total = totalData(survei);
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
            <BoxInset
                result={totalDataModel(survei.data[0].sangat_puas, total)}
            >
                <i class="bi-emoji-heart-eyes text-success" slot="logo" />
                <h5 slot="title">Sangat Puas</h5>
                <form
                    action="?/sangat_puas"
                    method="post"
                    use:enhance={handleSubmit}
                >
                    <button type="submit" class="btn btn-outline-success w-100"
                        >Pilih</button
                    >
                </form>
            </BoxInset>
        </div>
        <div class="col-lg-3 col-md-6 col-12">
            <BoxInset result={totalDataModel(survei.data[0].puas, total)}>
                <i class="bi-emoji-laughing text-info" slot="logo" />
                <h5 slot="title">Puas</h5>
                <form action="?/puas" method="post" use:enhance={handleSubmit}>
                    <button type="submit" class="btn btn-outline-info w-100"
                        >Pilih</button
                    >
                </form>
            </BoxInset>
        </div>
        <div class="col-lg-3 col-md-6 col-12">
            <BoxInset
                result={totalDataModel(survei.data[0].kurang_puas, total)}
            >
                <i class="bi-emoji-frown text-warning" slot="logo" />
                <h5 slot="title">Kurang Puas</h5>
                <form
                    action="?/kurang_puas"
                    method="post"
                    use:enhance={handleSubmit}
                >
                    <button type="submit" class="btn btn-outline-warning w-100"
                        >Pilih</button
                    >
                </form>
            </BoxInset>
        </div>
        <div class="col-lg-3 col-md-6 col-12">
            <BoxInset result={totalDataModel(survei.data[0].tidak_puas, total)}>
                <i class="bi-emoji-angry text-danger" slot="logo" />
                <h5 slot="title">Tidak Puas</h5>
                <form
                    action="?/tidak_puas"
                    method="post"
                    use:enhance={handleSubmit}
                >
                    <button type="submit" class="btn btn-outline-danger w-100"
                        >Pilih</button
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
                        aria-valuenow={totalDataModel(
                            survei.data[0].sangat_puas,
                            total
                        )}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    >
                        <div
                            class="progress-bar progress-bar-striped progress-bar-animated bg-success"
                            style="width: {totalDataModel(
                                survei.data[0].sangat_puas,
                                total
                            ) + `%`}"
                        >
                            {totalDataModel(survei.data[0].sangat_puas, total) +
                                "%"}
                        </div>
                    </div>
                </div>
                <div class="bar mb-3">
                    <h6>Puas</h6>
                    <div
                        class="progress"
                        role="progressbar"
                        aria-label="Animated striped example"
                        aria-valuenow={totalDataModel(
                            survei.data[0].puas,
                            total
                        )}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    >
                        <div
                            class="progress-bar progress-bar-striped progress-bar-animated bg-info"
                            style="width: {totalDataModel(
                                survei.data[0].puas,
                                total
                            ) + `%`}"
                        >
                            {totalDataModel(survei.data[0].puas, total) + "%"}
                        </div>
                    </div>
                </div>
                <div class="bar mb-3">
                    <h6>Kurang Puas</h6>
                    <div
                        class="progress"
                        role="progressbar"
                        aria-label="Animated striped example"
                        aria-valuenow={totalDataModel(
                            survei.data[0].kurang_puas,
                            total
                        )}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    >
                        <div
                            class="progress-bar progress-bar-striped progress-bar-animated bg-warning"
                            style="width: {totalDataModel(
                                survei.data[0].kurang_puas,
                                total
                            ) + `%`}"
                        >
                            {totalDataModel(survei.data[0].kurang_puas, total) +
                                "%"}
                        </div>
                    </div>
                </div>
                <div class="bar">
                    <h6>Tidak Puas</h6>
                    <div
                        class="progress"
                        role="progressbar"
                        aria-label="Animated striped example"
                        aria-valuenow={totalDataModel(
                            survei.data[0].tidak_puas,
                            total
                        )}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    >
                        <div
                            class="progress-bar progress-bar-striped progress-bar-animated bg-danger"
                            style="width: {totalDataModel(
                                survei.data[0].tidak_puas,
                                total
                            ) + `%`}"
                        >
                            {totalDataModel(survei.data[0].tidak_puas, total) +
                                "%"}
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

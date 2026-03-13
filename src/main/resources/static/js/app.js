$(document).ready(function () {
    const API_URL = "/ktp";

    // Initialize display
    fetchKtp();

    // Submit handler (Create/Update)
    $("#ktp-form").submit(function (e) {
        e.preventDefault();

        const id = $("#ktp-id").val();
        const data = {
            nomorKtp: $("#nomorKtp").val(),
            namaLengkap: $("#namaLengkap").val(),
            alamat: $("#alamat").val(),
            tanggalLahir: $("#tanggalLahir").val(),
            jenisKelamin: $("#jenisKelamin").val()
        };

        if (id) {
            updateKtp(id, data);
        } else {
            createKtp(data);
        }
    });

    // Refresh button
    $("#btn-refresh").click(function () {
        fetchKtp();
    });

    // Cancel edit
    $("#btn-cancel").click(function () {
        resetForm();
    });

    function fetchKtp() {
        $.ajax({
            url: API_URL,
            method: "GET",
            success: function (response) {
                renderTable(response);
            },
            error: function (xhr) {
                showError("Gagal mengambil data", xhr);
            }
        });
    }

    function createKtp(data) {
        $.ajax({
            url: API_URL,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function () {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Data KTP berhasil ditambahkan!',
                });
                resetForm();
                fetchKtp();
            },
            error: function (xhr) {
                showError("Gagal menambah data", xhr);
            }
        });
    }

    function updateKtp(id, data) {
        $.ajax({
            url: `${API_URL}/${id}`,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function () {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Data KTP berhasil diperbarui!',
                });
                resetForm();
                fetchKtp();
            },
            error: function (xhr) {
                showError("Gagal memperbarui data", xhr);
            }
        });
    }

    window.deleteKtp = function (id) {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4f46e5',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: `${API_URL}/${id}`,
                    method: "DELETE",
                    success: function () {
                        Swal.fire(
                            'Dihapus!',
                            'Data KTP berhasil dihapus.',
                            'success'
                        );
                        fetchKtp();
                    },
                    error: function (xhr) {
                        showError("Gagal menghapus data", xhr);
                    }
                });
            }
        });
    };

    window.editKtp = function (id) {
        $.ajax({
            url: `${API_URL}/${id}`,
            method: "GET",
            success: function (ktp) {
                $("#ktp-id").val(ktp.id);
                $("#nomorKtp").val(ktp.nomorKtp);
                $("#namaLengkap").val(ktp.namaLengkap);
                $("#alamat").val(ktp.alamat);
                $("#tanggalLahir").val(ktp.tanggalLahir);
                $("#jenisKelamin").val(ktp.jenisKelamin);

                $("#form-title").text("Edit Data KTP");
                $("#btn-submit").html('<i class="fas fa-edit"></i> Perbarui Data');
                $("#btn-cancel").show();
                
                // Scroll to form
                $('html, body').animate({
                    scrollTop: $(".form-section").offset().top - 20
                }, 500);
            },
            error: function (xhr) {
                showError("Gagal mengambil detail data", xhr);
            }
        });
    };

    function renderTable(data) {
        const tbody = $("#ktp-list");
        tbody.empty();

        if (data.length === 0) {
            $("#ktp-table").hide();
            $("#empty-state").show();
            return;
        }

        $("#ktp-table").show();
        $("#empty-state").hide();

        data.forEach((ktp, index) => {
            const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td><span class="badge font-mono">${ktp.nomorKtp}</span></td>
                    <td><strong>${ktp.namaLengkap}</strong></td>
                    <td>${ktp.alamat}</td>
                    <td>${formatDate(ktp.tanggalLahir)}</td>
                    <td>${ktp.jenisKelamin === 'Laki-laki' ? 'L' : 'P'}</td>
                    <td class="action-btns">
                        <button onclick="editKtp(${ktp.id})" class="btn btn-sm btn-edit" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteKtp(${ktp.id})" class="btn btn-sm btn-delete" title="Hapus">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
            tbody.append(row);
        });
    }

    function resetForm() {
        $("#ktp-form")[0].reset();
        $("#ktp-id").val("");
        $("#form-title").text("Tambah Data KTP");
        $("#btn-submit").html('<i class="fas fa-save"></i> Simpan Data');
        $("#btn-cancel").hide();
    }

    function formatDate(dateStr) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateStr).toLocaleDateString('id-ID', options);
    }

    function showError(title, xhr) {
        let message = "Terjadi kesalahan pada server.";
        if (xhr.responseJSON) {
            if (xhr.responseJSON.message) {
                message = xhr.responseJSON.message;
            } else {
                // Handle validation errors from MethodArgumentNotValidException
                message = Object.values(xhr.responseJSON).join("<br>");
            }
        }
        
        Swal.fire({
            icon: 'error',
            title: title,
            html: message
        });
    }
});

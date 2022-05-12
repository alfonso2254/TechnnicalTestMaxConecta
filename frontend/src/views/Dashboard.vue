 <template>
    <div class="flex flex-wrap justify-center pt-10">
        <h1 class="text-center text-5xl w-full mb-5 text-white">To Do App</h1>

        <div class="w-full md:w-1/3 md:pr-3">
            <div class="p-5 bg-white border rounded-lg text-black">
                <h2 class="mt-3 text-center text-2xl font-bold">
                    {{ `${modeEdit ? "Edit " : "New "}` }} Task
                </h2>
                <vs-input v-model="formData.name" label-placeholder="Title" class="block w-full my-8 text-black"
                    state="dark">
                    <template #icon>
                        <bookmark-icon size="1.5x" class="custom-class"></bookmark-icon>
                    </template>
                </vs-input>
                <vs-input v-model="formData.description" label-placeholder="Description"
                    class="block w-full mt-8 mb-3 text-black" state="dark">
                    <template #icon>
                        <align-center-icon size="1.5x" class="custom-class"></align-center-icon>
                    </template>
                </vs-input>

                <vs-checkbox v-model="formData.completed"> Completed </vs-checkbox>

                <div class="footer mt-5">
                    <vs-button :success="modeEdit" flat :loading="loadingSave" class="w-full" @click="saveUpdateTasks">
                        {{ `${modeEdit ? "Update " : "Save "}` }}
                    </vs-button>
                    <vs-button @click="blankForm" flat danger class="w-full">
                        Cancel
                    </vs-button>
                </div>
            </div>
        </div>
        <div class="w-full mt-5 md:mt-0 md:w-1/2">
            <vs-table class="bg-white" ref="tableList">
                <template #header>
                    <vs-input v-model="search" placeholder="Search" state="dark" class="block" />
                </template>
                <template #thead>
                    <vs-tr>
                        <vs-th> Completed </vs-th>
                        <vs-th sort @click="taskList = $vs.sortData($event, taskList, 'name')">
                            Task
                        </vs-th>
                        <vs-th sort @click="taskList = $vs.sortData($event, taskList, 'description')">
                            Description
                        </vs-th>
                        <vs-th sort @click="taskList = $vs.sortData($event, taskList, 'created_at')">
                            Created At
                        </vs-th>
                        <vs-th sort @click="taskList = $vs.sortData($event, taskList, 'updated_at')">
                            Updated At
                        </vs-th>
                        <vs-th> Actions </vs-th>
                    </vs-tr>
                </template>
                <template #tbody>
                    <vs-tr color="" :key="i" v-for="(tr, i) in $vs.getPage(
                        $vs.getSearch(taskList, search),
                        page,
                        max
                    )" :data="tr" :is-selected="tr.completed">
                        <vs-td checkbox>
                            <vs-checkbox @change="updateStatus(tr)" v-model="tr.completed" />
                        </vs-td>
                        <vs-td>
                            {{ tr.name }}
                        </vs-td>
                        <vs-td>
                            {{ tr.description }}
                        </vs-td>
                        <vs-td class="text-nowrap">
                            {{ tr.created_at | formatDate }}
                        </vs-td>
                        <vs-td class="text-nowrap">
                            {{ tr.updated_at | formatDate }}
                        </vs-td>
                        <vs-td>
                            <div class="flex">
                                <vs-button flat class="mr-1" @click="editTask(tr)">
                                    <edit-icon size="1.5x" class="custom-class"></edit-icon>
                                </vs-button>
                                <vs-button flat danger @click="deleteTaskConfirm(tr)">
                                    <trash-2-icon size="1.5x" class="custom-class">
                                    </trash-2-icon>
                                </vs-button>
                            </div>
                        </vs-td>
                    </vs-tr>
                </template>
                <template #footer>
                    <vs-pagination v-model="page" :length="$vs.getLength($vs.getSearch(taskList, search), max)" />
                </template>
            </vs-table>
            <vs-dialog :loading="loadingDelete" v-model="activeConfirmeDelete">
                <template #header>
                    <h4 class="text-xl font-semibold">Confirm</h4>
                </template>
                <div class="con-content">
                    <h4 class="text-lg">Are you sure you want to delete this task?</h4>
                </div>
                <template #footer>
                    <div class="flex justify-between">
                        <vs-button @click="activeConfirmeDelete = false" danger>
                            Cancel
                        </vs-button>
                        <vs-button :loading="loadingPaginaDelete" success @click="deleteTask">
                            Accept
                        </vs-button>
                    </div>
                </template>
            </vs-dialog>
        </div>
    </div>
</template>
 <script>
import {
    BookmarkIcon,
    AlignCenterIcon,
    EditIcon,
    Trash2Icon,
} from "vue-feather-icons";
export default {
    components: {
        BookmarkIcon,
        AlignCenterIcon,
        EditIcon,
        Trash2Icon,
    },
    filters: {
        formatDate(date) {
            // format date to dd/mm/yyyy hh:mm
            if (date) {
                let d = new Date(date);
                let month = "" + (d.getMonth() + 1),
                    day = "" + d.getDate(),
                    year = d.getFullYear();
                let hours = d.getHours();
                let minutes = d.getMinutes();

                if (month.length < 2) month = "0" + month;
                if (day.length < 2) day = "0" + day;

                return [day, month, year].join("/") + " " + [hours, minutes].join(":");
            }
        },
    },
    data: () => ({
        loadingSave: false,
        taskSelect: {},
        search: "",
        page: 1,
        max: 4,
        formData: {
            name: "",
            description: "",
            completed: false,
        },
        activeConfirmeDelete: false,
        loadingDelete: false,
        modeEdit: false,
    }),
    computed: {
        taskList() {
            return this.$store.state.Task.tasks;
        },
    },
    methods: {
        async indexTasks() {
            const loading = this.$vs.loading({
                target: this.$refs.tableList,
            });
            try {
                this.loadingSave = true;
                await this.$store.dispatch("Task/index");
            } catch (e) {
                console.log(e);
            } finally {
                loading.close();
                this.loadingSave = false;
            }
        },
        async saveUpdateTasks() {
            try {
                this.loadingSave = true;
                if (this.formData.name == "") {
                    this.$vs.notification({
                        progress: "auto",
                        color: "danger",
                        title: "Name is required",
                        position: "top-right",
                    });
                    return;
                }
                if (!this.modeEdit) {
                    await this.$store.dispatch("Task/store", this.formData);
                } else {
                    await this.$store.dispatch("Task/update", this.formData);
                }

                this.$vs.notification({
                    progress: "auto",
                    color: "success",
                    title: `Task ${this.modeEdit ? "Update " : "Created "} successfully`,
                    position: "top-right",
                });
                this.indexTasks();
                this.blankForm();
            } catch (e) {
                console.log(e);
            } finally {
                this.loadingSave = false;
            }
        },
        deleteTaskConfirm(task) {
            this.taskSelect = task;
            this.activeConfirmeDelete = true;
        },
        async deleteTask() {
            try {
                this.loadingDelete = true;
                await this.$store.dispatch("Task/delete", this.taskSelect.id);
                this.$vs.notification({
                    progress: "auto",
                    color: "success",
                    title: "Task Deleted",
                    text: `Task deleted successfully`,
                    position: "top-right",
                });
                this.indexTasks();
                this.activeConfirmeDelete = false;
            } catch (e) {
                console.log(e);
            } finally {
                this.loadingDelete = false;
            }
        },
        updateStatus(task) {
            this.$store.dispatch("Task/update", task);
        },
        editTask(task) {
            this.modeEdit = true;
            this.formData = {
                id: task.id,
                name: task.name,
                description: task.description,
                completed: task.completed,
            };
        },
        blankForm() {
            this.formData = {
                name: "",
                description: "",
                completed: false,
            };
            this.modeEdit = false;
        },
    },
    mounted() {
        this.indexTasks();
    },
};
</script>


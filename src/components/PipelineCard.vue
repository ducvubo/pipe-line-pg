<!-- <template>
    <Card class="bg-white">
        <template #title>{{ project.name }}</template>
        {{ project.pipelineToken }}
        <template #content>
            <div class="flex flex-col items-start gap-2 my-2">
                <div>Pipeline: #{{ project.pipelines.id }}</div>
                <div class="flex items-center gap-2">
                    <span>Trạng thái pipeline:</span>
                    <Tag :severity="getSeverity(project.pipelines.status)" :value="getText(project.pipelines.status)">
                    </Tag>
                </div>
                <div class="flex items-center gap-2">
                    <span>Trạng thái push: </span>
                    <Tag :severity="getSeverityGitHub(project.gitHubRepo.status)"
                        :value="getTextGitHub(project.pipelines.status)">
                    </Tag>
                </div>
                <div class="flex items-center gap-5">
                    <a :href="project.linkGithub" target="_blank" class="text-blue-500">Github Repo</a>
                    <a :href="project.linkGitlab" target="_blank" class="text-blue-500">Gitlab Repo</a>
                </div>
            </div>
        </template>
        <template #footer>
            <Button :disabled="project.pipelines.status === 'running' || project.pipelines.status === 'created'"
                :label="getText(project.pipelines.status)" severity="success" @click="triggerPipeline" />
        </template>
    </Card>
</template>

<script setup>
import Button from 'primevue/button';
import Card from 'primevue/card';
import Tag from 'primevue/tag';

const props = defineProps(['project']);
const emit = defineEmits(['trigger']);

const triggerPipeline = () => {
    emit('trigger');
};

const getSeverity = (status) => {
    switch (status) {
        case 'created':
            return 'help'
        case 'running':
            return 'info'
        case 'pending':
            return 'warn'
        case 'success':
            return 'success'
        case 'failed':
            return 'danger'
        default:
            return status
    }
}

const getText = (status) => {
    switch (status) {
        case 'created':
            return 'Đã kích hoạt'
        case 'pending':
            return 'Đang chờ'
        case 'running':
            return 'Đang chạy...'
        case 'success':
            return 'Thành công'
        case 'failed':
            return 'Lỗi chạy pipeline'
        default:
            return "Không xác định"
    }
}

const getSeverityGitHub = (status) => {
    switch (status) {
        case 'queued':
            return 'warn'
        case 'in_progress':
            return 'info'
        case 'success':
            return 'success'
        case 'failure':
            return 'danger'
        default:
            return "contrast"
    }
}

const getTextGitHub = (status) => {
    switch (status) {
        case 'queued':
            return 'Đang chờ'
        case 'in_progress':
            return 'Đang chạy...'
        case 'success':
            return 'Thành công'
        case 'failure':
            return 'Lỗi push'
        default:
            return "Không xác định"
    }
}



</script> -->


<template>
    <Card class="bg-white">
        <template #title>{{ project.name }}</template>
        {{ project.pipelineToken }}
        <template #content>
            <div class="flex flex-col items-start gap-2 my-2">
                <div>Pipeline: #{{ project.pipelines.id }}</div>
                <div class="flex items-center gap-2">
                    <span>Trạng thái pipeline:</span>
                    <Tag :severity="getSeverity(project.pipelines.status)" :value="getText(project.pipelines.status)">
                    </Tag>
                </div>
                <div class="flex items-center gap-2">
                    <span>Trạng thái push: </span>
                    <Tag :severity="getSeverityGitHub(project.gitHubRepo.status)"
                        :value="getTextGitHub(project.gitHubRepo.status)">
                    </Tag>
                </div>
                <div class="flex items-center gap-5">
                    <a :href="project.linkGithub" target="_blank" class="text-blue-500">Github Repo</a>
                    <a :href="project.linkGitlab" target="_blank" class="text-blue-500">Gitlab Repo</a>
                    <a :href="project.linkApp" target="_blank" class="text-blue-500">App</a>

                </div>
            </div>
        </template>
        <template #footer>
            <div class="flex gap-3 justify-center ">
                <Button :disabled="project.pipelines.status === 'running' || project.pipelines.status === 'created'"
                    :label="getText(project.pipelines.status)" severity="success" @click="triggerPipeline" />
                <Button label="Show Log" severity="info" @click="showLogDialog = true" />
            </div>
        </template>
    </Card>

    <Dialog class="bg-white" v-model:visible="showLogDialog" header="Log của 3 job cuối cùng" :style="{ width: '50vw' }"
        :modal="true">
        <div v-if="loadingLogs" class="p-4">Đang tải log...</div>
        <div v-else-if="jobLogs.length > 0" class="flex flex-col gap-4">
            <div v-for="(log, index) in jobLogs.sort((a, b) => +(a.jobId) - +(b.jobId))" :key="index"
                class="border p-4 rounded">
                <div class="font-bold">Job ID: {{ log.jobId }} - {{ log.jobName }} (Trạng thái: {{ log.status }})</div>
                <pre class="mt-2 text-sm whitespace-pre-wrap">{{ stripAnsi(log.log) }}</pre>
            </div>
        </div>
        <div v-else class="p-4">Không tìm thấy log nào.</div>
        <template #footer>
            <Button label="Đóng" severity="secondary" @click="showLogDialog = false" />
        </template>
    </Dialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Tag from 'primevue/tag';
import Dialog from 'primevue/dialog';
import { baseURL, gitlabToken } from '../apiService';

const props = defineProps(['project']);
const emit = defineEmits(['trigger']);

// Dialog và log state
const showLogDialog = ref(false);
const jobLogs = ref([]);
const loadingLogs = ref(false);

const GITLAB_URL = baseURL;
const ACCESS_TOKEN = gitlabToken;
const BRANCH_NAME = 'main';

const stripAnsi = (str) => {
    return str.replace(/\x1B[[(?);]{0,2}(;?\d)*./g, '');
};

const getLatestJobs = async () => {
    try {
        const response = await axios.get(
            `${GITLAB_URL}/projects/${props.project.id}/jobs`,
            {
                headers: {
                    'PRIVATE-TOKEN': ACCESS_TOKEN,
                },
                params: {
                    ref: BRANCH_NAME,
                },
            }
        );

        const jobs = response.data;
        if (jobs.length === 0) {
            throw new Error('Không tìm thấy job nào cho branch ' + BRANCH_NAME);
        }
        return jobs.slice(0, 3); // Lấy 3 job mới nhất
    } catch (error) {
        console.error('Lỗi khi lấy danh sách job:', error.message);
        throw error;
    }
};

const getJobLog = async (jobId) => {
    try {
        const response = await axios.get(
            `${GITLAB_URL}/projects/${props.project.id}/jobs/${jobId}/trace`,
            {
                headers: {
                    'PRIVATE-TOKEN': ACCESS_TOKEN,
                },
                responseType: 'text',
            }
        );
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy log của job:', error.message);
        throw error;
    }
};

const fetchLatestJobLogs = async () => {
    loadingLogs.value = true;
    jobLogs.value = [];
    try {
        const latestJobs = await getLatestJobs();
        const logPromises = latestJobs.map(async (job) => {
            const log = await getJobLog(job.id);
            return { jobId: job.id, jobName: job.name, status: job.status, log };
        });
        jobLogs.value = await Promise.all(logPromises);
    } catch (error) {
        console.error('Đã xảy ra lỗi khi lấy log:', error.message);
    } finally {
        loadingLogs.value = false;
    }
};

watch(showLogDialog, (newVal) => {
    if (newVal) {
        fetchLatestJobLogs();
    }
});

const triggerPipeline = () => {
    emit('trigger');
};

const getSeverity = (status) => {
    switch (status) {
        case 'created':
            return 'help';
        case 'running':
            return 'info';
        case 'pending':
            return 'warn';
        case 'success':
            return 'success';
        case 'failed':
            return 'danger';
        default:
            return status;
    }
};

const getText = (status) => {
    switch (status) {
        case 'created':
            return 'Đã kích hoạt';
        case 'pending':
            return 'Đang chờ';
        case 'running':
            return 'Đang chạy...';
        case 'success':
            return 'Thành công';
        case 'failed':
            return 'Lỗi chạy pipeline';
        default:
            return 'Không xác định';
    }
};

const getSeverityGitHub = (status) => {
    switch (status) {
        case 'queued':
            return 'warn';
        case 'in_progress':
            return 'info';
        case 'success':
            return 'success';
        case 'failure':
            return 'danger';
        default:
            return 'contrast';
    }
};

const getTextGitHub = (status) => {
    switch (status) {
        case 'queued':
            return 'Đang chờ';
        case 'in_progress':
            return 'Đang chạy...';
        case 'success':
            return 'Thành công';
        case 'failure':
            return 'Lỗi push';
        default:
            return 'Không xác định';
    }
};
</script>